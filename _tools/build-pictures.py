"""Build the website's product pictures from the brand folder.

Run from the repository root with a Python that has Pillow:
    python3 _tools/build-pictures.py

Source: Orwyn Ltd/04-brand/website-screenshots-v0.13/<slot>.png (2x screenshots).
Output: img/<slot>-1200.webp, img/<slot>-800.webp and img/<slot>.png (the PNG fallback).
Each slot keeps its name, so the pages need no change when a new picture arrives.
Slots with no source file are skipped and reported. This folder is not deployed (.vercelignore).
"""
import os, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, '..', '..', '04-brand', 'website-screenshots-v0.13')

# slot name: (source file names to try, in order; optional crop height in source pixels)
SLOTS = {
    '01-result':               (['01-result.png', '01-result-acl.png'], None),
    '02-finish-letters':       (['02-finish-letters.png', '02-finish-letter-to-patient.png'], 2050),
    '03-surgeon-letter':       (['03-surgeon-letter.png', '03-letter-to-acute-knee-clinic.png'], None),
    '04-imaging-request':      (['04-imaging-request.png', '04-mri-request.png'], None),
    '05-safety-stop':          (['05-safety-stop.png', '05-safety-stop-screen.png'], None),
    '06-safety-questions':     (['06-safety-questions.png'], None),
    '07-mechanism-one-tap':    (['07-mechanism-one-tap.png'], None),
    '08-patient-page-phone':   (['08-patient-page-phone.png'], None),
    '09-clinic-note':          (['09-clinic-note.png'], None),
    '10-physiotherapy-referral': (['10-physiotherapy-referral.png'], None),
    '08-patient-page-phone-full': (['08-patient-page-phone-full.png'], None),
}

def build(slot, names, crop_h):
    src = next((os.path.join(SRC, n) for n in names if os.path.exists(os.path.join(SRC, n))), None)
    if not src:
        return f'{slot}: no source yet, skipped'
    im = Image.open(src).convert('RGB')
    if crop_h and im.height > crop_h:
        im = im.crop((0, 0, im.width, crop_h))
    out = []
    for w in (1200, 800):
        # a narrow source (a phone screen) is kept at its own width, never enlarged
        tw = min(w, im.width)
        r = im.resize((tw, round(im.height * tw / im.width)), Image.LANCZOS) if tw != im.width else im.copy()
        # keep whichever WebP is smaller: lossy, or lossless from the 256-colour version
        import io
        lossy, lossless = io.BytesIO(), io.BytesIO()
        r.save(lossy, 'WEBP', quality=82, method=6)
        r.quantize(256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGB').save(lossless, 'WEBP', lossless=True, method=6)
        best = min(lossy, lossless, key=lambda b: b.getbuffer().nbytes)
        open(os.path.join(ROOT, 'img', f'{slot}-{w}.webp'), 'wb').write(best.getvalue())
        if w == 1200:
            r.quantize(256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(os.path.join(ROOT, 'img', f'{slot}.png'), optimize=True)
            out.append(f'{r.width}x{r.height}')
    return f'{slot}: from {os.path.basename(src)} {" ".join(out)} (update width and height in the pages if the size changed)'

if __name__ == '__main__':
    for slot, (names, crop) in SLOTS.items():
        print(build(slot, names, crop))
