---
level: 1
title: Timr
year: 2026
status: shipped
summary: "Shift scheduling and time tracking for Icelandic businesses. Web rosters, geofenced clock-in on mobile, and hours classified against whichever collective agreement applies."
tags: ["LARAVEL", "NEXT.JS", "REACT NATIVE", "MYSQL"]
screenshot: ../../assets/projects/timr/hero.webp
brand: '#0a7c68'
domain: TIMR.IS
accentSwap:
  role: green
  with: yellow
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
      image: ../../assets/projects/timr/screenshot-1.webp
    - eyebrow: "TIME OFF"
      color: red
      title: "The vacation year starts in May"
      body: "Icelandic vacation years do not follow the calendar, so balances are counted against a company-configured window, and a working day is whatever days the company is open minus the red days — editing opening hours rewrites the vacation math instead of leaving two settings to drift apart. Pending requests hold their days so the same balance cannot be spent twice, and only holiday deducts: sick, parental and unpaid leave are recorded without touching it. Everyone can see who is away, but the type is hidden unless the request is your own — the roster needs to know someone is out, not why."
      image: ../../assets/projects/timr/screenshot-2.webp
    - eyebrow: "BILLING"
      color: yellow
      title: "Recurring card payments, hand-rolled"
      body: "Three ISK tiers with employee caps, trial conversion, hosted checkout and merchant-initiated recurring charges through Verifone — no Cashier, no Stripe. Webhooks are verified as attached-payload JWS against the RFC 8785 canonicalisation of the request body, with keys selected by ID and a forced JWKS refresh for rotation. Billing routes deliberately sit outside the subscription middleware so a lapsed owner can still reach the page that lets them pay."
      image: ../../assets/projects/timr/screenshot-3.webp

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
---
