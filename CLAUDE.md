# orwynhealth.com — rules for any Claude session working in this repo

This is the public website of Orwynhealth Ltd (company 17374862). It deploys AUTOMATICALLY to orwynhealth.com via Vercel on every push to main. Never push to main without Dr Arj Imbuldeniya's explicit go in the current conversation. Work on a branch, show the diff, wait.

## What this site is
Orwyn: surgeon-governed decision support for first-contact musculoskeletal (MSK) clinicians in the NHS. Founded by Dr Arj Imbuldeniya (always "Dr", never "Mr"). Plain static HTML, no build step, no framework. Clean URLs via vercel.json.

## Hard content rules — breaking these is a business risk, not a style slip
- NO audit figures, statistics or clinical outcome numbers anywhere on the site.
- NO prices.
- NO mention of Dr Imbuldeniya's private practice or OrthoLongevity: Orwyn is a strictly separate brand.
- NO claims that Orwyn is endorsed by the NHS or any trust. The independence disclaimer on the About page stays.
- The disclaimer strip appears on every page and is never removed or softened. Current wording (approved by Dr Imbuldeniya 9 August 2026 as a DRAFT pending the clinical safety officer's review): "Decision support for clinicians only. The clinician assesses the patient and makes every decision. Orwyn is not a service for patients and gives no advice directly to patients or the public."
- Never change the wording of existing copy without Dr Imbuldeniya's explicit approval; copy is approved verbatim. Layout and styling changes are fine on a branch.
- British English. Acronyms glossed at first use (MSK, FCP and so on). No marketing or startup vocabulary of any kind.

## Brand system (single source: these values, do not re-derive)
Colours: plum #2B1B2E (grounds, ink, buttons), coral #E5735B (accent), sage #7A8F7D, parchment #F6F4EF (page background), stone #D6D8DB, card #FFFFFF, muted #6B6470, line #E5E1E6. All already in styles.css :root — never invent new hex values.
Typography: Playfair Display (headings, wordmark), Inter (body/UI). The wordmark is always TYPESET, lowercase "orwyn", never an image; the o takes coral on dark grounds only.
Red, amber and green are functional safety colours only, never decoration; coral is never a warning colour.

## Coral policy (ruled by Dr Imbuldeniya, 9 August 2026; tightened to one word same day)
Coral is spent sparingly, one word at a time: a single headline keyword per heading (.accent), at most one bold keyword in a lead (b.hl), Read more links and hover states. NOT on card headings. Constraint that never bends: coral only on large text or bold text of 14px and above — small plain coral body text on white fails WCAG contrast (3.03:1) and this is an NHS-facing site.

## Design language
Restraint: one idea per screen, generous vertical space, centred sections. Content fades up on scroll (.reveal + IntersectionObserver) and must keep respecting prefers-reduced-motion. Soft geometry: pill buttons, 14px card radii. Mobile below 880px: centred brand, hamburger menu (.menubtn), no visible link row.

## Structure
Seven pages: index, what-orwyn-does, safety, about, nhs, contact, privacy — shared styles.css, per-page canonical/OG tags, Organization schema on index only, sitemap.xml kept in step with any page added or removed. Protected files, do not modify or delete: logo.png, favicon.png, portrait.jpg, social.jpg, hero-mark.png, robots.txt, google091cc17a7cfd7918.html.

## Process
1. Branch, never main.
2. Make the change; keep every rule above.
3. Show the diff and, for visual changes, open the page locally for review.
4. Wait for Dr Imbuldeniya's explicit go before any merge or push to main.
