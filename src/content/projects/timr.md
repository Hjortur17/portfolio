---
level: 1
title: Timr
year: 2026
status: shipped
summary: "Shift scheduling and time tracking for Icelandic businesses. Web rosters, geofenced clock-in on mobile, and hours classified against whichever collective agreement applies."
tags: ["LARAVEL", "NEXT.JS", "REACT NATIVE", "MYSQL"]
cover: ../../assets/projects/placeholder.webp
featured: true
order: 1
externalHref: https://www.timr.is
externalLabel: VISIT THE SITE
caseStudy:
  role: "Founder and sole developer — product, API, web app, mobile app, billing, infrastructure"
  timeline: "Mar 2026 – ongoing · ~5.5 months to a paid product"
  stack: "Laravel 12, MySQL, Next.js 16, React 19, Expo / React Native, Sanctum, Verifone, Resend"
  team: "Just me"
  lead: "Icelandic rota software either ignores collective agreements entirely or hardcodes one of them. Timr treats the agreement as data, because a single company can employ people working under four different ones."
  heroImage: ../../assets/projects/placeholder.webp
  heroLabel: "TIMR-HERO.PNG"

  problemTitle: "There is no such thing\nas a normal working day."
  problemBody:
    - "Every scheduling tool has to answer one question: was this hour ordinary time, overtime, or a premium? In Iceland the answer depends on which collective agreement covers the employee. Tourism sets the ordinary-hours window at 07:00–17:00. Hotel reception uses 08:00–17:00. Retail runs 09:00–18:00, office work 09:00–17:00. A car rental with a front desk, a workshop and an office employs people under all of them at once."
    - "Hardcoding one window and calling it a setting would have shipped months earlier. It would also have been quietly wrong for most of the market, and wrong in the specific way that turns up in someone's payslip rather than in an error log."
  problems:
    - "Ordinary-hours windows differ by trade, so there is no company-wide answer to what counts as overtime"
    - "Overtime thresholds are monthly, so whether an hour is overtime depends on the rest of the month, not on that day"
    - "Premium rates vary by weekday and clock range — Friday evening is not Monday evening under every agreement"
    - "Public holidays are Easter-relative, and two Icelandic holidays collide on the same date in 2038 and 2057"

  approachTitle: "Three decisions that\nshaped everything else."
  approachIntro: "The classification engine drove the architecture; billing and mobile both bent around it."
  decisions:
    - title: "Agreements are rows, not code"
      body: "Day windows, monthly overtime thresholds, unpaid break lengths and premium bands all live in the database, resolved per employee rather than per company. Bands are keyed on weekday set plus clock range with validity dates, because a rate that differs between Friday and Monday evening cannot be expressed as three conditionals in a classifier. Each agreement row also stores the clause it came from and when that clause was last read."
      color: accent
    - title: "Measure against the roster, not a clock window"
      body: "Hours are classified against what the employee was published to work, which collapses two products into one. Salaried office staff are not a separate mode with separate rules — they are people rostered 08:00 to 16:00. One code path covers hourly, rostered and salaried, and there is no work-time-mode setting for anyone to get wrong."
      color: red
    - title: "Mobile is employees only"
      body: "The Expo app does clock in, clock out and see your shifts. Owners who sign in on mobile get a handoff screen that mails them a link to the desktop dashboard instead of a cut-down roster editor. Drag-and-drop scheduling on a phone is a bad product, and building it badly would have cost the month the app actually took to build."
      color: yellow

  buildSections:
    - eyebrow: "THE ROSTER"
      color: accent
      title: "Draft, then publish — and remember what you published"
      body: "Managers build rosters privately and bulk-publish a date range; until then employees see nothing. Publishing snapshots the date and the employee onto the row, so reassigning or deleting a shift later cannot retroactively rewrite what someone was told they were working. Exports read soft-deleted shifts too, for the same reason — a shift deleted last month must not erase a day that was actually worked."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "CLOCK IN"
      color: red
      title: "Geofencing that degrades honestly"
      body: "Clock-in compares GPS position against a per-location radius by haversine distance. Where a shift has no location attached it falls back to the nearest workplace, and where a location has no coordinates set it records the position but enforces nothing. The alternative — refusing to clock someone in because an admin never filled in a latitude — turns a data-entry gap into a payroll dispute."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "BILLING"
      color: yellow
      title: "Recurring card payments, hand-rolled"
      body: "Three ISK tiers with employee caps, trial conversion, hosted checkout and merchant-initiated recurring charges through Verifone — no Cashier, no Stripe. Webhooks are verified as attached-payload JWS against the RFC 8785 canonicalisation of the request body, with keys selected by ID and a forced JWKS refresh for rotation. Billing routes deliberately sit outside the subscription middleware so a lapsed owner can still reach the page that lets them pay."
      image: ../../assets/projects/placeholder.webp

  hardPart:
    title: "An hour's classification\ndepends on the month."
    paragraphs:
      - "The classifier resolves a precedence chain — public holiday beats day off beats overtime beats premium beats ordinary time — and for most of that chain a single day is enough context. Overtime is not. Icelandic agreements set overtime thresholds monthly, so whether the 174th hour of a month is overtime depends on the 173 that came before it, not on the shape of that day's plan."
      - "That breaks the natural implementation, where you classify a day and sum the results. A separate monthly path now counts the whole month even when only part of it was requested, then attributes the overtime back onto the days that crossed the line. The same constraint is why agreements are resolved for every employee up front, before any counting starts — a company can span several trades, so the lookup is per employee, and doing it inside the loop would put a query on every hour."
      - "Premium bands started as conditionals in that classifier and did not survive contact with real agreements. SGS pays Friday evening differently from Monday evening; three ifs cannot express that. Moving bands into a table keyed on weekday set, clock range and validity date was the change that made agreement number four cost a row instead of a release. The whole thing sits behind 696 test cases, and the code carries its own warning that the interpretation needs checking against the source clause."
    flowLabel: "CLASSIFY"
    flowSteps:
      - label: "1  Resolve agreements per employee"
      - label: "2  Load published roster for the month"
      - label: "3  Count the month, not the day"
        color: accent
      - label: "4  Apply premium bands by weekday"
      - label: "5  Split into payroll hour types"
        color: green
    note: "Holidays are merged last so the two Icelandic feasts that collide in 2038 resolve to the higher rate rather than to whichever was applied first."

  outcomeTitle: "Three apps, one product,\nfive and a half months."
  metrics:
    - value: "~49,000"
      label: "Lines across API, web and mobile"
      color: green
    - value: "696"
      label: "API test cases, 0.72 lines of test per line of code"
      color: accent
    - value: "91"
      label: "API endpoints behind four middleware layers"
      color: yellow
  retrospective:
    - "Multi-tenancy is enforced by a global scope on every tenant model, and there are a dozen places — calendar feeds, employee dedupe, vacation lookups — that have to switch it off to do their job. Every one of those is a cross-tenant leak waiting for a careless refactor. A scope you routinely disable is not really a boundary."
    - "The dunning retry window was anchored on a column that is null for a subscription converting off a trial, so those subscriptions never expired and were re-charged daily. It was caught by reading the code, not by a failing test or an alert. Money paths need monitoring that does not depend on me rereading them."
    - "I shipped the collective-agreement engine without a payroll bureau or a union reviewing the interpretation. The code flags its own uncertainty and cites clauses, which is better than nothing, but 'the developer read the agreement carefully' is not the standard this needs to meet."
    - "A meaningful share of the late work ran through an autonomous agent loop driven off my issue tracker. It moved fast and it is the least documented decision in the project — six months from now I will not be able to tell which choices were mine."
---
