#!/usr/bin/env node
/*
  verify-demo.mjs — fail if the deployed demo has drifted from the engine.

  Compares the engine SHA-256 stamped into demo/index.html (by rebuild-demo.mjs)
  against the SHA-256 of the engine file you point it at. Needs NO password.
  Run it before any deploy that should ship the current engine.

  Usage:
    node demo/_build/verify-demo.mjs --engine "/path/to/orwyn-clinician-tool.html"

  Exit 0 = demo matches the engine. Exit 1 = drift (rebuild the demo). Exit 2 = usage/parse error.
*/
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEMO_INDEX = resolve(HERE, '..', 'index.html');

function arg(name) { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : undefined; }
const enginePath = arg('--engine');
if (!enginePath) { console.error('ERROR: --engine <path> is required'); process.exit(2); }

const gate = readFileSync(DEMO_INDEX, 'utf8');
const m = gate.match(/orwyn-demo-build: engine-sha256=([0-9a-f]{64}); engine-title="([^"]*)"/);
if (!m) { console.error('DRIFT: demo/index.html has no build stamp — rebuild it with rebuild-demo.mjs'); process.exit(1); }
const stampedSha = m[1], stampedTitle = m[2];

const engine = readFileSync(enginePath);
const engineSha = createHash('sha256').update(engine).digest('hex');
const engineTitle = (engine.toString('utf8').match(/<title>([^<]*)<\/title>/) || [,''])[1];

if (engineSha === stampedSha) {
  console.log('OK: demo matches the engine.');
  console.log('  ', stampedTitle);
  process.exit(0);
}
console.error('DRIFT: the deployed demo does NOT match the engine.');
console.error('  demo was built from : ' + stampedTitle + '  (sha ' + stampedSha.slice(0, 16) + '…)');
console.error('  engine on disk now  : ' + engineTitle + '  (sha ' + engineSha.slice(0, 16) + '…)');
console.error('  -> rebuild: ORWYN_DEMO_PW=… node demo/_build/rebuild-demo.mjs --engine "' + enginePath + '"');
process.exit(1);
