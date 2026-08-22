---
level: 2
title: Bílahótel.is
year: 2026
status: updated
summary: "Long-term car storage bundled with servicing done while the car sits parked. I built it on Laravel in 2020, ran it for two seasons, then rebuilt it in seventeen days."
tags: ["NEXT.JS", "PRISMIC", "PRISMA", "BORGUN"]
cover: ../../assets/projects/placeholder.webp
featured: true
order: 2
externalHref: https://www.bilahotel.is
externalLabel: VISIT THE SITE
caseStudy:
  role: "Sole developer — both versions. Architecture, frontend, payments, admin tooling, deploys"
  timeline: "v1: Jan 2020 – Apr 2022 · v2: rebuilt Mar 2026 in 17 working days"
  stack: "Next.js 16, React 19, Prismic, Prisma, MariaDB, Borgun SecurePay, Resend, Sentry, Vercel"
  team: "Me on the build; the Bílahótel team runs pricing and availability in Prismic"
  lead: "A car storage business that stopped taking bookings in 2022 and wanted to reopen in 2026. The old system worked; the question was whether to restart it or replace it."
  heroImage: ../../assets/projects/placeholder.webp
  heroLabel: "BILAHOTEL-HERO.PNG"

  problemTitle: "The old system worked.\nThat was the problem."
  problemBody:
    - "The first version was a Laravel and Vue app I built in 2020 and maintained through two seasons — coupons, invoicing, saved vehicles, national ID validation, SMS with Icelandic characters, PDF confirmations, a luggage storage product with physical locker codes. It closed for bookings in April 2022 and sat dormant for four years."
    - "Restarting it meant inheriting all of that. Most of those features existed because someone asked once, not because the business needed them, and every one of them was a thing to maintain in a codebase four years out of date. The honest read was that the 2020 app had taught me what the business actually required, and that was a much smaller product than what I had built."
  problems:
    - "Four years of dependency drift on a stack that also needed a server to run on"
    - "Prices and service catalogues were in the database, so every price change was a deploy"
    - "Features built for one-off requests — coupons, invoicing, saved cars — that nobody had used in years"
    - "A normalised schema meant a later price edit could silently change what a past customer had been charged"

  approachTitle: "Three decisions that\nshaped everything else."
  approachIntro: "The rebuild kept the business logic and threw away almost everything else."
  decisions:
    - title: "Put the catalogue in the CMS"
      body: "There is no service table in the database. Tyre changes, oil changes, cleaning, storage tiers, prices, and the date ranges when something cannot be booked all live in Prismic as five custom types. Staff close a week for tyre work or change a price without me, and without a deploy. The database holds transactions and nothing else."
      color: accent
    - title: "Snapshot the price into the booking"
      body: "Selected services land in the reservation row as a JSON column with their prices baked in. It gives up SQL aggregation by service, which is a real cost. What it buys is that a reservation is an immutable receipt — editing a price in the CMS next month cannot retroactively change what someone was charged last month."
      color: red
    - title: "Three tables, no relations"
      body: "Reservations, admins, and one-time codes. No user accounts, no coupons, no saved vehicles, no kennitala. Customers book without registering, staff sign in with an emailed six-digit code, and the whole schema fits on one screen. Everything the 2020 version had that this does not is a thing I decided the business would not miss."
      color: yellow

  buildSections:
    - eyebrow: "THE BOOKING WIDGET"
      color: accent
      title: "Three steps, placeable by an editor"
      body: "Dates, vehicle details, services — mounted as a Prismic slice variation, so the booking form is something staff can put on a page rather than something I deploy. Date range plus vehicle size drives a live catalogue fetch, because both determine what can even be offered. Storage is never chosen by the customer: the day count picks the tier automatically and injects it as a line item."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "AVAILABILITY"
      color: red
      title: "Blocked periods as a CMS field"
      body: "Every service carries a repeatable group of unavailable-from and unavailable-to dates. Filtering is a plain interval overlap run on raw date strings rather than Date objects — ISO dates sort lexicographically, so string comparison is correct and sidesteps timezone drift entirely. Staff close a date range in the CMS and the service disappears from the form for those dates."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "OPS DASHBOARD"
      color: yellow
      title: "The board staff actually work from"
      body: "Icelandic throughout, down to the URLs. Reservations move through four states, and one of them is named for the moment a booking gets re-keyed into the rental system the business already runs on — the tool was built alongside that back office, not to replace it. Soft cancellation records which admin did it. A daily cron mails customers two days before pickup."
      image: ../../assets/projects/placeholder.webp

  hardPart:
    title: "A bank gateway with\nno SDK and two hashes."
    paragraphs:
      - "Payment runs through Borgun SecurePay, which has no npm package. The integration is a form POST built at runtime in the DOM and submitted cross-origin, then a server-to-server callback that has to be verified before a booking is marked paid. Both directions are signed, and the two signatures are not the same construction — the outgoing one covers merchant, both callback URLs, order, amount and currency; the incoming one covers only order, amount and currency."
      - "Getting that wrong in the forgiving direction means accepting a forged confirmation. The callback verifies with a timing-safe comparison, wrapped in a try/catch because the comparison throws outright on a length mismatch, and only marks the reservation paid when both the step and the status match. It answers with the literal XML acknowledgement the gateway requires, which is not documented anywhere except in the gateway's own examples."
      - "Most of the debugging was not cryptographic. The gateway returned its status in inconsistent casing between environments, which cost two commits and a production booking that paid successfully and was recorded as unpaid. Amounts are rounded to integers throughout because the Icelandic króna has no subunit, and item descriptions are truncated to eighty characters because the gateway silently rejects longer ones."
    flowLabel: "PAYMENT"
    flowSteps:
      - label: "1  Server writes reservation, unpaid"
      - label: "2  Build signed form, POST to Borgun"
      - label: "3  Verify callback hash, timing-safe"
        color: accent
      - label: "4  Mark paid, send confirmation"
      - label: "5  Acknowledge in the gateway's XML"
        color: green
    note: "A callback whose hash does not verify is rejected outright — the reservation stays unpaid rather than being taken on trust."

  outcomeTitle: "Seventeen days from\nempty repo to taking money."
  metrics:
    - value: "17"
      label: "Working days from reset to live payments"
      color: green
    - value: "9,215"
      label: "Lines of TypeScript, down from a full Laravel app"
      color: accent
    - value: "3"
      label: "Database tables, zero relations"
      color: yellow
  retrospective:
    - "Reservation numbers are generated by reading the last row and adding one, with no transaction and no sequence. Two people checking out in the same second collide on a unique constraint. I chose it because staff read those numbers out over the phone and a random ID is unusable there — but the correct fix is a database sequence, not a read-then-write."
    - "Two different day-count formulas exist in the codebase. Pricing uses one, the receipt and confirmation email use the other, and they disagree by one. I still do not know whether that is a deliberate nights-versus-days display choice from 2020 that survived the rewrite, or a bug customers have been quietly reading for months."
    - "There are no tests. The 2020 version at least had PHPUnit configured. For a rewrite whose whole justification was reducing what I have to maintain, shipping zero automated coverage on a payment path is the wrong kind of less."
    - "The per-page SEO block is commented out and the metadata function returns one hardcoded title, so every page on the site shares it — while the CMS content type defines the fields for it properly. Half a feature is worse than none, because it looks finished."
---
