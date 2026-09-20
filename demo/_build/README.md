# Demo build & drift guard

The public demo at `/demo` (`demo/index.html`) is a password gate that carries the
clinician engine **AES-GCM-encrypted** inside a `const P = {…}` blob. The engine
itself lives in a **separate** repo (`03-engine/app/orwyn-clinician-tool.html`), so
the demo does **not** update when the engine does. It drifted once already — the live
demo was `v0.9` while the committed engine was `v0.10`. These two scripts stop that
happening silently.

> `_build/` is excluded from the Vercel deploy via `.vercelignore`, so nothing here is
> served publicly. The password is **never** stored here — it is read from the
> `ORWYN_DEMO_PW` environment variable at build time only.

## After you change the engine — rebuild the demo

Always build from the **committed** engine (commit the engine first):

```bash
# from the orwynhealth-site repo root. Name the ENGINE COMMIT you mean, not HEAD,
# so the build is reproducible and you can state which commit was published.
git -C "../../03-engine" show <engine-commit>:app/orwyn-clinician-tool.html > /tmp/orwyn-engine.html
bash -c 'read -rs -p "Demo password: " PW && echo && ORWYN_DEMO_PW="$PW" node demo/_build/rebuild-demo.mjs --engine /tmp/orwyn-engine.html'
```

The password is typed at the prompt, hidden, and never appears in the command, in
your shell history or in this repository. The `read` step runs inside `bash`
deliberately: the default shell on macOS is zsh, where `read -p` means something
else and the line fails before it asks for anything. There is also a
double-click version of the whole sequence at `08-website/Rebuild Orwyn demo.command`,
outside this repository.

This re-encrypts the engine into `demo/index.html` (gate and login flow untouched),
round-trip-checks the encryption before writing, and stamps the engine's SHA-256 and
`<title>` into the file as a non-secret HTML comment.

## Before you deploy — verify no drift

```bash
git -C "../../03-engine" show <engine-commit>:app/orwyn-clinician-tool.html > /tmp/orwyn-engine.html
node demo/_build/verify-demo.mjs --engine /tmp/orwyn-engine.html
```

Exit `0` = the deployed demo matches the committed engine. Exit `1` = drift — rebuild
before deploying. `verify` needs **no** password (it compares the stamped hash), so it
is safe to wire into a pre-push hook or CI step that has the engine checked out.

## If the demo password ever changes

Old "remember me" keys in visitors' browsers stop working (expected). Rebuild with the
new `ORWYN_DEMO_PW` and redeploy.
