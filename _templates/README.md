# Knee referral decision pages — template and rules

This folder is **excluded from the Vercel deploy** by `.vercelignore`. Nothing in here
is served, indexed or linked. It exists so the knee cluster can be built to a fixed
shape rather than improvised page by page.

## Why the clinical pages are not written yet

The knee cluster is the highest-value search territory Orwyn can own, because knee is
the first clinical pathway. It is also the only part of the site where getting a
sentence wrong could change what a clinician does to a patient.

On 14 to 15 August 2026, thirteen citations in the Orwyn evidence register were checked
against their primary sources and five were wrong. That is a normal rate of drift for
any expert's remembered evidence base, and it is exactly why these pages are not being
written from memory or generated at volume.

**Rule: no clinical threshold, referral criterion or red flag goes on this website until
it names a source that can be opened and read, and until a second clinician has reviewed
the page.** Where a statement is Dr Imbuldeniya's own clinical position rather than
published guidance, it is labelled as expert opinion on the page.

## Planned URLs, in build order

1. `/knee-orthopaedic-referral-criteria` — when does a patient with knee pain need an orthopaedic opinion
2. `/knee-osteoarthritis-referral` — when should knee osteoarthritis be referred
3. `/knee-red-flags-msk` — findings that need urgent escalation from first contact
4. `/knee-mri-before-orthopaedic-referral` — does a patient need an MRI before referral
5. `/meniscal-tear-orthopaedic-referral` — when does a suspected meniscal tear need specialist review

## Required structure for every page in this cluster

Use `knee-article-template.html`. Each page must carry, in this order:

1. **Definition first.** One short paragraph that answers the search query directly,
   in plain English, before any framing. This is what answer engines quote.
2. **Who this is for.** GPs, first contact practitioners, MSK physiotherapists,
   advanced practitioners. Never written as patient-facing content.
3. **The clinical body**, in `<h2>` sections that match how the question is actually
   asked, with each substantive statement linked to NICE, GIRFT, NHS England, a
   professional body (BOA, BASK, British Hip Society) or peer-reviewed literature.
4. **What this page does not cover**, including the explicit statement that urgent and
   emergency presentations follow local pathways and are not managed through advice.
5. **Author, reviewer, date of last review, and the source list.** The reviewer line is
   only added once a real second clinician has reviewed it. Do not pre-fill it.
6. **The standing site disclaimer** and the non-endorsement sentence.

## Metadata rules

- `title` under about 60 characters, leading with the question, ending `| orwyn`.
- Unique meta description, canonical, Open Graph and Twitter tags.
- `Article` schema with `datePublished`, `dateModified`, author and publisher.
- `BreadcrumbList`: Home → Resources → Knee referral decisions → page.
- `FAQPage` only where the page genuinely answers discrete questions, and the answer
  text must match the visible page text.
- Add the page to `sitemap.xml` and link it from `/resources` on the same commit.

## Things that must never appear on these pages

- Any performance claim about Orwyn: reduces referrals by X, cuts waiting times,
  improves outcomes, saves money, validated or proven.
- Any figure from the retrospective audit, until Stage 2 is complete and a second
  reviewer is appointed.
- Any implication that first contact clinicians lack competence. The problem is
  information and feedback, never the clinician.
- Any claim of endorsement, accreditation, regulatory approval or medical device
  status that Orwyn does not hold.
