---
level: 2
title: Bílahótel.is
year: 2026
status: updated
summary: "Long-term car storage bundled with servicing done while the car sits parked. I built it on Laravel in 2020, ran it for two seasons, then rebuilt it in seventeen days."
tags: ["NEXT.JS", "PRISMIC", "PRISMA", "BORGUN"]
screenshot: ../../assets/projects/bilahotel/hero.webp
brand: '#C0392B'
domain: BILAHOTEL.IS
# motorhome.is red sits ~4° from the portfolio's own #FF3B5C, so this
# page runs yellow wherever it would have run red. Never the reverse:
# the client colour stays as it is.
accentSwap:
  role: red
  with: yellow
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
      image: ../../assets/projects/bilahotel/screenshot-2.webp
    - eyebrow: "PRICING"
      color: red
      title: "A price change is an edit, not a deploy"
      body: "Every service is a Prismic document across five repeatable types, so the public price list and the booking form read the same records — a number cannot be current in one and stale in the other. The pricing shape is fields too, not code: an oil service with a max price renders as a range, a per-litre flag appends the unit, storage prices by the day inside a min-max band. Staff change a price, add a service, or untick bookable to pull something off the form while it stays on the price list."
      image: ../../assets/projects/bilahotel/screenshot-1.webp
      caption: "The public price list, rendered from the same documents the booking form fetches."

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
---
