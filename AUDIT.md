# Audit: branch site-v2, Stage A

Claude Code, 21 September 2026. Branch `site-v2` from `main` at 1d5d3b1. Nothing committed, pushed or merged. `demo/` untouched.

## Screenshots

Full-page screenshots at 375, 430, 768, 1024, 1280 and 1440 pixels wide are outside the repository, so they are never deployed or committed:

- Before (main): `08-website/site-v2-audit-screenshots/before/` (home, what-orwyn-does, nhs, contact, safety, standards, about)
- After (site-v2): `08-website/site-v2-audit-screenshots/after/` (all 18 pages)

File names are `<page>-<width>.png`. They were taken with animations switched off and fonts loaded, so the layout is not measured mid-animation.

## Lighthouse, phone (mobile emulation), local server

| Page | Performance | Accessibility | Best practices | SEO | Total weight | Largest paint | Layout shift |
|---|---|---|---|---|---|---|---|
| Home, before | 100 | 98 | 100 | 100 | 246 KB | 1.9 s | 0 |
| Home, after | 99 | 100 | 100 | 100 | 204 KB | 2.1 s | 0 |
| NHS, before | 100 | 98 | 100 | 100 | 138 KB | 1.7 s | 0 |
| NHS, after | 100 | 100 | 100 | 100 | 164 KB | 1.7 s | 0 |
| What it does, before | 100 | 94 | 100 | 100 | 142 KB | 1.7 s | 0 |
| What it does, after | 100 | 96 | 100 | 100 | 163 KB | 1.7 s | 0 |
| See the demo, after | 100 | 96 | 100 | 100 | 144 KB | 1.7 s | 0 |
| Evidence, after | 100 | 100 | 100 | 100 | 137 KB | 1.6 s | 0 |
| Contact, after | 100 | 100 | 100 | 100 | 134 KB | 1.6 s | 0 |

All pages and all four categories are at 95 or above. Scores are from a local server with no content delivery network, so live figures will differ a little. The remaining accessibility point on What it does and See the demo is coral headline words on the parchment ground (2.75:1). It was already failing before this branch, and fixing it is a brand decision (NEXT_DECISIONS.md item 11). "Document has no main landmark", the other failure before, is fixed on every page.

Homepage budget (A12.4): 204 KB in total against a 1 MB limit. The largest picture is 72 KB as WebP (113 KB as the PNG fallback) against a 200 KB limit. Both fonts are preloaded. Every picture has width and height set, so nothing shifts as pictures load (layout shift 0).

## What I found on main

1. The first screen showed the large logo mark, not the product (A1).
2. "See the demo" went straight to the password page from every page (A12).
3. The six-step homepage graphic, the six numbered homepage steps and the four steps on What it does were three different models of the product. Two described outcome feedback in the present tense ("Orwyn sends that outcome back to them"), but it is not built yet.
4. The NHS page had no answers on what does not change, evaluation design, who provides what, or governance (A5).
5. On the NHS scale graphic, the "20m+ people" card said "Source: NHS England", while the paragraph above it credits that figure to ARMA. Corrected on the branch; please confirm (COPY-FOR-APPROVAL.md).
6. Several sentences put the gap in the clinician rather than in the system (A7). Five rewrites are proposed.
7. Stat figures ("Up to 30%", "Almost 1 in 3", "No.1") were not in equal-height cards and their sources did not line up. Now one component: one size (clamp), one weight, one line height, sources pinned to the card foot.
8. The header logo was 32 pixels in HTML and 34 in CSS. Now 34 everywhere, from one variable.
9. `hero-mark.png` is not used by any page (the hero mark was inline SVG). It is a protected file, so it is left as it is. The aspect-ratio item in A8 therefore needs nothing.
10. `knee-orthopaedic-referral-criteria` is indexed and in the sitemap, which contradicts the repository's CLAUDE.md. Git history shows it was published on purpose on 21 August, so I left it (NEXT_DECISIONS.md item 12).
11. The supplied picture `05-safety-stop-screen.png` is not a safety stop screen (NEXT_DECISIONS.md item 1).
12. No console errors, no broken links and no sideways scrolling on main, before or after.

## Checks run on the branch

- Sideways scrolling: none on any of 18 pages at any of the six widths (scripted: page width and every element's right edge).
- Console errors: none on any page.
- Internal links, image sources, srcset entries and in-page anchors: all resolve (scripted over all 18 pages).
- Structured data: every JSON-LD block parses. Organization and WebSite on home (with "Orwyn Health" and "Orwynhealth" as alternate names), AboutPage with Person on about, Article on evidence and the reference pages, BreadcrumbList on every inner page except privacy. I have not run Google's Rich Results Test, because that needs the live address; please run it on the preview deployment.
- One H1 per page, no duplicate IDs, a unique title and meta description on every page, one canonical address per page. Vercel `cleanUrls` already redirects `/page.html` to `/page`, so there is no competing `.html` copy. My local test server copies that behaviour.
- No em or en dashes in any file touched on the branch, including comments in the files edited.
- `demo/` still carries its noindex tag and is unchanged.
- Walk-through: works with the mouse, the keyboard (Tab to the buttons; the left and right arrow keys move between steps), and screen readers (labelled carousel, "1 of 4" slide labels, a polite live region announcing each step). No autoplay. Without JavaScript all four steps show in order.
- The review documents (this file and its siblings) are added to `.vercelignore`, so they are never served.

## Not done in Stage A

- The video slot in the walk-through is an HTML comment waiting for the recording (A12.1).
- The link back from the demo password page (item 3 in NEXT_DECISIONS.md).
- Stage B pages: not started, as instructed.

## Follow-up 1 (21 September 2026)

### Lighthouse, phone, after follow-up 1

| Page | Performance | Accessibility | Best practices | SEO | Total weight | Largest paint | Layout shift |
|---|---|---|---|---|---|---|---|
| Home | 97 | 100 | 100 | 100 | 302 KB | 2.6 s | 0 |
| See the demo | 98 | 96 | 100 | 100 | 242 KB | 2.4 s | 0 |
| Evidence | 100 | 100 | 100 | 100 | 139 KB | 1.6 s | 0 |
| First contact practitioners explained | 100 | 95 | 100 | 100 | 154 KB | 1.7 s | 0 |

- The homepage grew from 204 KB to 302 KB. That is the 64 KB video poster plus the step 1 safety picture, still well under the 1 MB budget. The largest picture is still under 200 KB.
- The first run after adding the video measured 435 KB, because the hidden walk-through slides were shown until the deferred script ran, and their pictures loaded. Fixed: slides 2 to 4 are hidden in CSS from the first paint, and a `<noscript>` style shows every slide in order when JavaScript is off.
- The remaining accessibility points are large coral headline words on parchment at phone size, kept on Dr Imbuldeniya's ruling (NEXT_DECISIONS.md, item B).

### Video (item 1)

- `<video controls playsinline preload="none">` with width and height set, WebM first and MP4 second, a poster and no autoplay. It sits directly under the hero on the homepage, above the click-through, and at the top of /see-the-demo.
- Checked in headless Chrome: before play, the only media request is the poster (64 KB). After play, the WebM is requested and plays (1280 by 800).
- Text alternative: a `<details>` element with the thirteen captions and their times, transcribed from frames of the recording (one frame a second; the captions are burned into the video, and there is no caption track). The video points to it with `aria-describedby`.
- VideoObject structured data on both pages: name, description, thumbnailUrl (JPEG poster), uploadDate 2026-09-21, duration PT1M32S, contentUrl (MP4). It parses; Google's Rich Results Test needs the live address.
- The files are in `media/`: MP4 4.4 MB, WebM 3.6 MB, poster as WebP (64 KB) and JPEG (111 KB, for structured data).

### Coral text (item 5)

New token `--coral-text: #AE4E3A` in `styles.css`. Contrast: 5.3:1 on white, 4.8:1 on parchment, 4.6:1 on the sage tint, 4.9:1 on the soft coral ground. Scripted scan of every page's computed colours, showing where it is now used:

- Homepage: "Read more" on the link card to What it does.
- What it does: the bold word "together" in "Where it comes from".
- Safety, Standards, About, Resources: "Read more" and "Get in touch" on the link cards.
- First contact practitioners explained: the bold emphasised terms ("It is not physiotherapy treatment.", "It is not simply direct access physiotherapy...", "extended scope practitioner", "Band 5" to "Band 8").
- By rule it also covers any future `.accent` or bold `b.hl` inside body text on light grounds, and "Go" links on page-link cards.

Coral stays as it was on large headline words, and on everything on the plum ground (the wordmark "o", the hero kickers and the hero lede), which was outside this item.

### Phone hero (item 7)

Measured at 390 by 844: the headline runs from 241 to 317 pixels and the product picture from 340 to 575, so the first screen shows the headline and the whole picture. The lede follows, then the two buttons. At 375 by 667 the headline and the top of the picture are both on the first screen. The hero stack was tightened on phones, and hyphenated kicker words no longer break at the hyphen. No sideways scrolling at any of the six widths; no console errors.

## Follow-up 2 (21 September 2026)

- **Contrast (ruling B).** The content area now sits on the white ground, so no coral heading word is on parchment or sage. The alternating rhythm now comes from hairlines between sections, the plum bands, and cards with the parchment tint. Coral on white is 3.03:1, which passes for large text. Lighthouse accessibility on a phone: **100 on all 18 pages** after follow-up 2 (it was 95 to 96 on five pages before).
- The texting claim is gone ("printed or shown on screen"), and the data-holding sentence on standards.html is softened. The password-advice sentence is deleted from NEXT_DECISIONS.md. `--coral-text` is added to the CLAUDE.md brand list.

## Follow-up 3 (21 September 2026)

### Lighthouse, phone, before and after follow-up 3

| Page | Performance | Accessibility | Best practices | SEO | Total weight | Largest paint | Layout shift |
|---|---|---|---|---|---|---|---|
| Home, before | 97 | 100 | 100 | 100 | 303 KB | 2.6 s | 0 |
| Home, after | 96 | 100 | 100 | 100 | 316 KB | 2.7 s | 0 |
| NHS, before | 100 | 100 | 100 | 100 | 166 KB | 1.8 s | 0 |
| NHS, after | 99 | 100 | 100 | 100 | 215 KB | 2.1 s | 0 |
| See the demo, before | 98 | 100 | 100 | 100 | 243 KB | 2.4 s | 0 |
| See the demo, after | 98 | 100 | 100 | 100 | 252 KB | 2.5 s | 0 |
| Knee criteria page (reference page baseline) | 100 | 100 | 100 | 100 | 151 KB | 1.8 s | 0 |
| Hot, swollen knee (Stage B), after | 100 | 100 | 100 | 100 | 153 KB | 1.9 s | 0 |

- **Every page after follow-up 3:** accessibility 100 and SEO 100 on all 24 pages. About was at 92 for SEO because of a "here" link; the link now has descriptive words.
- **Weight:** NHS is heavier because the referral letter picture now sits in its first screen. Every page stays far under the 1 MB budget.

### Checks

- **Structured data.** The schema.org validator reports no errors and no warnings on the homepage (SoftwareApplication, VideoObject, WebSite, FAQPage, with Organization by @id), About (AboutPage with Person), What it does, See the demo, Resources, Press and the Stage B pages. Google's Rich Results Test needs the live address (NEXT_DECISIONS.md, item 16).
- **Structure.** All 24 pages have one H1, valid JSON-LD, no broken internal links, anchors or image sources, no duplicate IDs and no dashes. Every page is within two clicks of the homepage, and no page is an orphan. For patients, Press and Resources are linked from the header or footer only.
- **Layout.** No sideways scrolling at 390 or 1440 pixels on any page, and no console errors.
- **Scroll reveal (2.4).** The hidden state now applies only after the page script has run. The results:
  - With JavaScript off: nothing hidden, and all four walk-through slides show in order.
  - In print: nothing hidden.
  - In a raw full-page capture after 3 seconds: nothing hidden. A timer reveals any section not yet scrolled to after 2.5 seconds, so screenshot and preview tools see the whole page.
  - With reduced motion: nothing is hidden at any point.
- **Pictures (2.5).** Every product picture sits in the same frame with the caption "Example patient", and opens larger on click or tap in a native dialog. The dialog opens at 1200 pixels with the alt text. No library.
- **Phone first screens (2.1).** Inner-page heroes are about 40 per cent shorter on desktop (padding 74 and 78 pixels becomes 44 and 46). On a 390 by 844 phone:
  - The first paragraph of Safety, Standards, About and the clinical pages shows on the first screen.
  - What it does, NHS and See the demo show the headline and the product picture (or the recording) on the first screen.

### Screenshots

At 390 and 1440 pixels for every page, in `08-website/site-v2-audit-screenshots/followup3/`.
