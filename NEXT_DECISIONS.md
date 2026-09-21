# Next decisions: branch site-v2

Updated 21 September 2026, after follow-ups 2 and 3. Things I was unsure about, or that only Dr Imbuldeniya can decide or do. Nothing here was guessed on the site.

## Open: needs your decision

1. **The hot, swollen knee page and the tool say different things about the well patient.** As you instructed, the page gives only the national guideline position and the safety rule's same-day action; it does not mention the 48-hour trial. The tool, under your rulings 78 to 83, gives a well patient with no high-risk features a 48-hour trial of an anti-inflammatory, with review at 48 hours. The page's wording is accurate ("When Orwyn's hot, swollen knee safety rule sends a patient to hospital..."), but a commissioner or clinician who reads the page and then runs the demo will find the difference. Please decide whether the page publishes as it is.
2. **Review line on the six clinical pages.** Each says "Draft of 21 September 2026, awaiting his review." When you approve a page, that line becomes "Last reviewed on [date]" and the page is ready to publish. Also: the repository's `_templates/README.md` says no clinical threshold goes on the site until a second clinician has reviewed the page. The knee criteria page was published with your review only (commit 3f6b463). Do the six pages need a second clinician's review, or is your review enough?
3. **X-ray page, one sentence to confirm.** "Where the patient cannot stand, the lateral is taken as a horizontal-beam lateral, which shows fat and blood in the joint." This comes from ruling 197, where it is recorded as Claude's exception "stated to you once", not as your own words.
4. **Five X-ray views for a wearing knee.** NICE and Evidence-Based Interventions say imaging is not usually needed to diagnose knee osteoarthritis. Your ruling stands (X-rays to plan treatment, never "to diagnose"), and the page says so plainly. Section V.B of the ruling sheet asked you to confirm this, because a commissioner or radiology department may challenge five views at a first visit.
5. **The questions section on the homepage.** Google asks that FAQ structured data matches text visible on the page, so the four questions now appear on the homepage as a short section. Keep it, or remove both the section and the data.
6. **"The difficult cases still reach a surgeon" (What it does)** has no demo or planned tag, because I could not tell whether the demo prepares cases for a multidisciplinary meeting. Please say which it is.
7. **The BiteLabs logo.** The supplied file is a white circle on a black square. On the white card the black corners showed, so I made only the corners outside the circle white; the logo itself is unchanged. Please also confirm "completed 2026" and the one-sentence description, which comes from BiteLabs' own UK fellowship page.
8. **Analytics (follow-up 3, section 4; not built).** The site runs no analytics, so nobody can tell whether the landing page works. The options:
   - (a) Vercel Web Analytics: no cookies, no personal data, already part of your hosting. It needs a one-line change to the privacy notice. It also needs a change to the sentence on standards.html, "This website sets no cookies and runs no analytics or tracking", which would no longer be true.
   - (b) Stay with Search Console only, which shows search appearances and clicks but nothing about what visitors do on the page.

   Claude in chat recommends (a). Your call.
9. **Demo requests** stay as a prefilled email, as you ruled.

## For the engine repository, not the website (noted, not changed)

10. **Two copies of the ruling sheet.** `03-engine/governance/rulings-dictated-20sep2026.md` stops at ruling 203; the copy in `04-brand/final-screen-design-19sep2026/` has ruling 204. I wrote the Stage B pages from the 04-brand copy and did not modify the engine repository.
11. **One evidence register link is wrong.** EV-BASK-MENISCAL-2019 links PMID 29983330, which is the 2018 BASK consensus on the definition and classification of meniscal lesions. The treatment guideline cited as "Bone Joint J 2019" is PMID 31154847. The website cites both correctly.

## Pictures

12. The picture slots are ready for the new set: `01-result`, `02-finish-letters`, `03-surgeon-letter`, `04-imaging-request`, `05-safety-stop`, `06-safety-questions`, `07-mechanism-one-tap`, `08-patient-page-phone`, `09-clinic-note`, `10-physiotherapy-referral`.
    - Drop the new files into `04-brand/website-screenshots-v0.13/` under those names and run `python3 _tools/build-pictures.py` (it needs Pillow). The script rebuilds the WebP and PNG files under the same names, so no page changes unless a picture changes size, and it says when one has.
    - Slots 06 to 10 have no picture yet, and no page shows an empty slot. The knee osteoarthritis page has a marked slot for an osteoarthritis result screen.
    - The locked knee page uses the ACL letter to the acute knee clinic, with its caption saying so, until a better picture exists.
13. **Media files.** When Claude in chat re-records the video, the three media files are replaced under the same names. The text alternative (the 13 captions) and the VideoObject duration are then updated from `orwyn-walkthrough-captions.txt`.

## Settled (kept for the record)

- `--coral-text` (#AE4E3A) kept and added to the CLAUDE.md brand list.
- Contrast: the content area moved to the white ground. Lighthouse accessibility is now 100 on all 24 pages.
- The poster stays.
- The repeated caption is a fault in the recording and waits for the re-record.
- The demo password stays.
- Walk-through slide 4 is confirmed.
- "Printed or shown on screen" replaces "by text or on paper".
- "Automated tests run on every change" is confirmed.
- Who provides what (nhs.html) is confirmed.
- The data-holding sentence on standards.html is softened, for approval.
- The press page stays separate.
- The for-patients page is live and indexable.
- CLAUDE.md is corrected.
- The demo password page link waits for the next demo rebuild.

## Only you can do these (after the branch is merged)

14. Submit the new `sitemap.xml` (24 pages) in Google Search Console, and check that the property shows as verified. The verification file is served from the repository.
15. Request indexing of the new and changed pages: the homepage, /see-the-demo, /nhs, /evidence, /for-patients, /press, and the six clinical pages.
16. Run Google's Rich Results Test on the preview deployment for the homepage (FAQ, video, software), /see-the-demo (video) and one clinical page (article). The schema.org validator already reports no errors or warnings. The software entry deliberately has no price and no rating, so Google will not show it as a software rich result. That is intended.

## Plan instead of an llms.txt file (not added, as instructed)

- Keep every page's first paragraph a plain, quotable answer to its main search phrase.
- Keep one Organization entity, and link Person, Article, SoftwareApplication and BreadcrumbList data to it by @id.
- Keep the sitemap current and the canonical addresses clean.
- Revisit an llms.txt file only if a major answer engine documents that it reads one.
