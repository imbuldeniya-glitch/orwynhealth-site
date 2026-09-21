# Changelog

## site-v2, Stage A (21 September 2026, not committed, not pushed)

Refinement, not a redesign: same palette, fonts, logo, voice and locked lines. All copy changes await approval in COPY-FOR-APPROVAL.md; open questions are in NEXT_DECISIONS.md; measurements are in AUDIT.md; search targets are in SEARCH-MAP.md.

### Added
- `see-the-demo.html`: the four-step walk-through with no password, then "Try it yourself" with a prefilled email request (subject "Demo access request"). No form back end and no tracking. (A12.2)
- `evidence.html`: "What we have tested, and what the first trial will measure", an honest status table with no ticks for unfinished work. (A6)
- `for-patients.html`: "My clinician used Orwyn. What does that mean?" (A11)
- `press.html`: company description, 100-word and 250-word founder biographies from the about page's facts, company facts, product pictures, press contact. (A11)
- `walk.js`: the walk-through, with next, back, step dots, arrow keys and a screen-reader live region. No autoplay, no library.
- `img/`: five product pictures from tool v0.13 as WebP (1200 and 800 wide) with PNG fallbacks, each under 142 KB.
- `og-product.jpg`, `og-letters.jpg`: Open Graph images for key pages, made from the product pictures.
- The review documents AUDIT.md, COPY-FOR-APPROVAL.md, NEXT_DECISIONS.md, SEARCH-MAP.md and this file, all excluded from the deploy in `.vercelignore`.

### Changed
- Homepage: two-column hero with the real product on the right (it follows the headline on a phone). The large logo mark is now in the header only. Two buttons: "See the demo" and "Discuss an NHS pilot". The walk-through sits directly under the hero, the new "two ways to get it wrong" diagram is in the problem section, and the one seven-step model replaces the six-step graphic and the six numbered steps. (A1, A3, A4, A12)
- What it does: the same model and diagram. The four former steps become four cards, tagged honestly as in the demo or planned. New pictures. (A2, A4)
- NHS page: rebuilt for a service lead or commissioner, with sections on where Orwyn sits, the consultation, what does not change, a first evaluation, what it would measure, who provides what, and governance. Existing copy kept and moved lower. (A5)
- Contact: two routes, one for clinicians and one for services and commissioners, and the no-patient-information line in the wording asked for. (A9)
- Every page: shared header with "See the demo" going to /see-the-demo, a footer with Evidence, For patients and Press, a `<main>` landmark with a skip link, and one closing band (the one-sentence description and the two buttons). Old closing bands with content are kept as link cards on about, safety and standards. (A12.5)
- Wording that put the gap in the clinician rather than the system: five rewrites. (A7)
- `styles.css`: one set of tokens for spacing, type scale (clamp), radii and card padding; one stat-figure component with equal card heights and aligned sources; identical step markers; header logo one size; new components for the hero, frame, walk-through, model diagram, status tags, status table, closing band. No new colours. (A8)
- Titles and meta descriptions for home, what it does, NHS, contact, privacy and the new pages; Organization alternate names; Person on about; BreadcrumbList on inner pages. The sitemap lists 18 pages, dated 21 September 2026. (A10, A11)
- NHS scale graphic: the "20m+" source label is corrected to ARMA, to match the paragraph above it (awaiting approval).

### Removed
- `product-decision-1440.png`, `product-result-severe-osteoarthritis.png`: replaced by the v0.13 pictures. (A2)

## site-v2, follow-up 1 (21 September 2026, not committed, not pushed)

### Added
- The screen recording, `media/orwyn-walkthrough-v0.13.webm` and `.mp4`, with its poster, under the heading "Watch a consultation, start to finish": directly under the homepage hero above the click-through, and at the top of /see-the-demo. No autoplay, `preload="none"`, a captions text alternative in `<details>`, and VideoObject structured data.
- `img/shot-safety-stop-*`: the real safety stop screen, now step 1 of the walk-through.
- `--coral-text` (#AE4E3A) for body-size coral text on light grounds.

### Changed
- Evidence page: record look-up is in the demo; the planned part is connection to a real record system.
- CLAUDE.md: the knee criteria page is described as published and indexed on purpose; the page list names all eighteen indexable pages.
- Phone hero: tighter spacing, hyphenated kicker words kept whole.
- Walk-through: slides 2 to 4 hidden from first paint, so their pictures no longer load early; a `<noscript>` style shows every slide without JavaScript.

### Removed
- `img/shot-safety-banner-*`: the stand-in banner crop.

## site-v2, follow-up 2 (21 September 2026, not committed, not pushed)

- Content area on the white ground, so no coral heading word sits on parchment or sage. Accessibility is 100 on every page.
- "By text or on paper" becomes "printed or shown on screen" (what-orwyn-does). The data-holding sentence on standards.html becomes an intention (for approval).
- CLAUDE.md brand list gains `--coral-text`. NEXT_DECISIONS.md loses the password-advice sentence.
- New `COPY-FOR-APPROVAL-SHORTLIST.md`.

## site-v2, follow-up 3 (21 September 2026, not committed, not pushed)

### Added
- Six clinical reference pages (Stage B): /knee-x-ray-views, /knee-mri-first-contact, /locked-knee, /hot-swollen-knee, /acl-injury-first-contact, /knee-osteoarthritis-first-contact. Each has:
  - Article and BreadcrumbList data, with the author as Person by @id;
  - a draft review line;
  - sources with links;
  - a "How Orwyn handles this" box;
  - "Read next" links.

  They are added to Resources under Diagnosis, Tests, Urgent problems and Referral, and to the sitemap (24 pages).
- Homepage: a "held to account" strip under the hero, a band for the named surgeon, and a visible questions section with FAQPage data. SoftwareApplication data on the homepage and What it does.
- About and Press: a "Programmes" block with the NHS Clinical Entrepreneur Programme and BiteLabs logos on white cards (`img/logo-*`). The Person data gains memberOf, alumniOf, worksFor by @id and the FRCS credential.
- `zoom.js`: click or tap any product picture to see it larger (native dialog, no library).
- `_tools/build-pictures.py`: rebuilds the ten picture slots from the brand folder. It is not deployed.
- "Read next" blocks on every reference page.

### Changed
- One H1 per key page: the search phrase and the brand line together, styled as before. The locked lines are unchanged.
- Inner-page first screens are about 40 per cent shorter. What it does, NHS and See the demo show a product picture (or the recording) in the first screen. The recording moves into the first screen of /see-the-demo.
- Every meta description is rewritten to 120 to 155 characters. The press title is under 60 characters.
- Pictures are renamed to the ten slot names (`img/01-result`, `02-finish-letters`, `03-surgeon-letter`, `04-imaging-request`, `05-safety-stop`). Every product picture has the "Example patient" caption.
- Scroll reveal: content is hidden only after the script runs; it is shown with reduced motion, in print, and after 2.5 seconds for full-page captures.
- About: the "here" link now has descriptive words.
- `.vercelignore`: `_tools/` and the shortlist are excluded.

### Removed
- The "More knee pages" placeholder section on Resources.
- The separate recording section on /see-the-demo (the recording now sits in the first screen).

## site-v2, release (21 September 2026)

- Final picture set from engine tip 1647a45: all ten slots and the full-length phone page, built with `_tools/build-pictures.py`. The tool now keeps a narrow phone screen at its own width, and keeps whichever WebP is smaller. Alt text from the final `ALT-TEXT.md`. New sizes for the letters and the surgeon letter.
- New recording (1 minute 36 seconds): VideoObject duration PT1M36S; the text alternative rebuilt from `orwyn-walkthrough-captions.txt` (16 captions, listed in order, without times).
- Picture placements added: the one-tap mechanism question in the ACL page's "How Orwyn handles this" box, and the patient's phone page on /for-patients, both captioned "Example patient".
- The six clinical pages read "Reviewed by Dr Arj Imbuldeniya, consultant orthopaedic knee and hip surgeon. Last reviewed 21 September 2026." Their sources line reads "Written from Dr Imbuldeniya's clinical rulings and the sources above, and reviewed by him on 21 September 2026." The Article data gains datePublished and dateModified.
- Checks:
  - all 24 pages pass the links, JSON-LD, one-H1, no-dash and duplicate-ID checks;
  - no sideways scrolling at 390 pixels and no console errors;
  - Lighthouse accessibility and SEO are 100 on Home, NHS, See the demo, the ACL page and For patients.
