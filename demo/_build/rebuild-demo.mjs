#!/usr/bin/env node
/*
  rebuild-demo.mjs: regenerate demo/index.html from the canonical engine.

  The public demo (demo/index.html) is a password gate that carries the
  clinician engine AES-GCM-encrypted in a `const P = {...}` blob. When the
  engine changes, the demo must be rebuilt or it silently drifts behind the
  laptop copy (this is what happened: live demo was v0.9 while the committed
  engine was v0.10). This script does that deterministically and stamps the
  engine's SHA-256 into the file so verify-demo.mjs can detect future drift
  WITHOUT needing the password.

  Usage:
    ORWYN_DEMO_PW='<password>' ORWYN_DEMO_SEND_CODE='<code>' \
      node demo/_build/rebuild-demo.mjs --engine "/path/to/orwyn-clinician-tool.html" [--out <file>]

  9 October 2026 (Dr Arj): the demo send code goes INSIDE the encrypted demo.
  The engine carries the exact line `const DEMO_SEND_CODE='';`; this script
  puts the code into that line in memory, then encrypts. The code is read only
  from ORWYN_DEMO_SEND_CODE (typed at a hidden Terminal prompt), is never
  written to disk or printed, and the build refuses to write a file in which
  the code can be read without the password. The stamped engine SHA-256 is of
  the engine file as committed, so verify-demo.mjs still works.
  --out writes somewhere other than demo/index.html (for a dry run).

  The password is read only from the ORWYN_DEMO_PW environment variable and is
  never written to disk or into the output. The encryption scheme (PBKDF2-
  SHA-256, 300k iterations, AES-256-GCM, tag appended) matches the gate's own
  decryptor, so existing "remember me" keys keep working only if the password
  is unchanged, which it is.
*/
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash, pbkdf2Sync, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEMO_INDEX = resolve(HERE, '..', 'index.html');   // demo/index.html (the gate we template from + overwrite)
const ITERS = 300000;

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
}

const enginePath = arg('--engine');
const outPath = arg('--out') ? resolve(arg('--out')) : DEMO_INDEX;
const pw = process.env.ORWYN_DEMO_PW;
const sendCode = process.env.ORWYN_DEMO_SEND_CODE;
if (!enginePath) { console.error('ERROR: --engine <path> is required'); process.exit(2); }
if (!pw) { console.error('ERROR: set ORWYN_DEMO_PW in the environment (never pass it as an argument)'); process.exit(2); }
if (!sendCode) { console.error('ERROR: set ORWYN_DEMO_SEND_CODE in the environment (typed at a hidden prompt, never passed as an argument)'); process.exit(2); }

const engineFile = readFileSync(enginePath);
const engineSha = createHash('sha256').update(engineFile).digest('hex');
const titleMatch = engineFile.toString('utf8').match(/<title>([^<]*)<\/title>/);
const engineTitle = titleMatch ? titleMatch[1] : '(no title)';

// Put the send code into the engine's one placeholder line, in memory only.
const PLACEHOLDER = "const DEMO_SEND_CODE='';";
const engineText = engineFile.toString('utf8');
const places = engineText.split(PLACEHOLDER).length - 1;
if (places !== 1) { console.error('ERROR: the engine must contain the line ' + PLACEHOLDER + ' exactly once (found ' + places + '). Is it a v0.15 build from 9 October 2026 or later?'); process.exit(1); }
const codeLiteral = JSON.stringify(sendCode).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const engine = Buffer.from(engineText.replace(PLACEHOLDER, 'const DEMO_SEND_CODE=' + codeLiteral + ';'), 'utf8');
const builtSha = createHash('sha256').update(engine).digest('hex');

// Encrypt the engine exactly as the gate expects to decrypt it.
const salt = randomBytes(16);
const nonce = randomBytes(12);
const key = pbkdf2Sync(Buffer.from(pw, 'utf8'), salt, ITERS, 32, 'sha256');
const cipher = createCipheriv('aes-256-gcm', key, nonce);
const body = Buffer.concat([cipher.update(engine), cipher.final()]);
const ct = Buffer.concat([body, cipher.getAuthTag()]);   // WebCrypto expects ciphertext||tag
const P = { salt: salt.toString('base64'), nonce: nonce.toString('base64'), iters: ITERS, ct: ct.toString('base64') };

// Round-trip check before we touch anything on disk.
{
  const k2 = pbkdf2Sync(Buffer.from(pw, 'utf8'), salt, ITERS, 32, 'sha256');
  const d = createDecipheriv('aes-256-gcm', k2, nonce);
  d.setAuthTag(ct.subarray(ct.length - 16));
  const pt = Buffer.concat([d.update(ct.subarray(0, ct.length - 16)), d.final()]);
  if (createHash('sha256').update(pt).digest('hex') !== builtSha || !pt.toString('utf8').includes('const DEMO_SEND_CODE=' + codeLiteral + ';')) {
    console.error('ERROR: round-trip decryption did not reproduce the engine. Aborting.');
    process.exit(1);
  }
}

// Take the existing gate as the template and swap only the P blob + fingerprint.
let gate = readFileSync(DEMO_INDEX, 'utf8');
if (!/const P = \{.*?\};/s.test(gate)) { console.error('ERROR: could not find `const P = {...};` in demo/index.html'); process.exit(1); }
gate = gate.replace(/const P = \{.*?\};/s, 'const P = ' + JSON.stringify(P) + ';');

// Stamp a non-secret fingerprint comment (used by verify-demo.mjs).
const stamp = `<!-- orwyn-demo-build: engine-sha256=${engineSha}; engine-title="${engineTitle}"; built=${new Date().toISOString()} -->`;
gate = gate.replace(/\n?<!-- orwyn-demo-build:[^>]*-->/g, '');   // drop any previous stamp
gate = gate.replace(/<\/head>/i, stamp + '\n</head>');

// The code must not be readable in the file without the password: not as typed,
// not escaped, not in base64, hex or URL encoding. Only the encrypted blob carries it.
{
  const forms = [sendCode, codeLiteral, JSON.stringify(sendCode), encodeURIComponent(sendCode),
    Buffer.from(sendCode, 'utf8').toString('base64').replace(/=+$/, ''),
    Buffer.from(sendCode, 'utf8').toString('base64url'),
    Buffer.from(sendCode, 'utf8').toString('hex')].filter((x) => x && x.length >= 4);
  // The ciphertext is random characters, so a short code could appear in it by
  // chance; it is unreadable without the password (the round trip above proves
  // it decrypts only with the key). Everything else in the file is scanned.
  const readable = gate.split(P.ct).join('');
  const hit = forms.some((f) => readable.toLowerCase().includes(f.toLowerCase()));
  if (hit || /DEMO_SEND_CODE/.test(readable)) { console.error('ERROR: the send code (or its name) can be read in the built file without the password. Nothing was written.'); process.exit(1); }
}

writeFileSync(outPath, gate);
console.log('Rebuilt ' + (outPath === DEMO_INDEX ? 'demo/index.html' : outPath));
console.log('  send code     : inside the encrypted engine only (not shown)');
console.log('  engine        :', enginePath);
console.log('  engine title  :', engineTitle);
console.log('  engine sha256 :', engineSha);
console.log('  payload bytes :', engine.length, '-> ct base64 chars:', P.ct.length);
