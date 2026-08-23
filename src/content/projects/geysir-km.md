---
level: 4
title: KM Registry
year: 2026
status: shipped
summary: "Long-term lease customers report their odometer once a month through a form with no login. The difference between two readings is what the lease bills on."
tags: ["NEXT.JS", "PRISMA", "POSTGRES", "RESEND"]
screenshot: ../../assets/projects/km-registry/hero.webp
brand: '#2FA36B'
domain: GEYSIR-KM.IS
featured: false
order: 4
externalHref: https://geysir-km.vercel.app
externalLabel: VIEW THE FORM
caseStudy:
  role: "Sole developer — data model, form UX, admin dashboard, auth, deploys"
  timeline: "Jan – Mar 2026 · live with real customers from early February"
  stack: "Next.js 16, React 19, Prisma 7, PostgreSQL, SQLite in dev, JWT via jose, Resend"
  team: "Me, plus the long-term rental staff who use the dashboard daily"
  lead: "A car rental company bills long-term leases on distance driven, and was collecting odometer readings by phone and email. The whole product is one number, entered once a month, by someone who should not have to make an account to do it."

  problemTitle: "One number a month,\ncollected by hand."
  problemBody:
    - "Long-term rental customers owe money based on how far they drove. Getting that number meant staff chasing people by phone and email, transcribing readings into a spreadsheet, and reconciling them against the billing system. Every step of that is a place for a digit to go missing, and a wrong odometer reading is a wrong invoice."
    - "The obvious shape is an account, a login, and a customer portal. That was the wrong instinct. Someone doing a thirty-second task once a month will not remember a password, and a forgotten-password flow for a task that small costs more support time than the phone calls it was meant to replace."
  problems:
    - "Readings arrived by phone and email and were transcribed by hand"
    - "No way to tell a genuine repeat submission from a customer who simply had not driven"
    - "Nothing linked one month's reading to the last, so the billable difference was worked out manually"
    - "A mistyped reading was invisible until it reached an invoice"

  approachTitle: "Three decisions that\nshaped everything else."
  approachIntro: "Every decision here was about removing steps from a task that should take thirty seconds."
  decisions:
    - title: "No accounts for customers"
      body: "The public form has no login and no session. Name, plate, reading — three fields. The device remembers the last submission in local storage and offers a one-tap prefill on the next visit, which is the whole of the personalisation. There is nothing to reset, nothing to forget, and nothing to support."
      color: accent
    - title: "Passwordless for staff too"
      body: "Admins enter an email, receive a six-digit code, and get a seven-day session cookie. No passwords stored, no reset flow, no password policy to maintain for a team of seven. The code expires in ten minutes and is deleted the moment it is used."
      color: red
    - title: "Never store the derived number"
      body: "The distance driven is recomputed from the reading history on every request rather than saved. It means a staff correction to an old reading immediately fixes every figure downstream of it, with no backfill and no stale column. The cost is a grouping pass on each load, which at this data volume is not a cost at all."
      color: yellow

  buildSections:
    - eyebrow: "THE FORM"
      color: accent
      title: "Built for a phone in a car park"
      body: "The reading field is a numeric keypad input with live Icelandic thousands separators applied as you type, while the raw integer goes into form state. Plates are capped at five characters and uppercased automatically. If the device remembers the plate, the form shows the last reading and refuses a lower one before anything hits the network. Success swaps the button to a checkmark and resets the form three seconds later."
      image: ""
    - eyebrow: "THE DASHBOARD"
      color: red
      title: "Previous, current, difference"
      body: "Icelandic throughout, down to the routes. Three counters split by processed and outstanding, then a sortable, filterable table whose important column is the derived one: kilometres driven since the last reading, in green. Staff mark rows done, correct mistakes inline, or add a reading on behalf of a customer who phoned it in anyway."
      image: ""
    - eyebrow: "EDITING HISTORY"
      color: yellow
      title: "Corrections that cannot break the chain"
      body: "An odometer only goes up, so a staff correction in the middle of a sequence has to fit between its neighbours. The edit route loads the car's full reading history, finds the row's position, and validates the new value against both the reading before and the reading after it. There is a separate branch for the case where a plate has been reassigned. It is the most careful code in the project, and it exists because the dashboard lets people change the past."
      image: ""

  hardPart:
    title: "The rule I shipped\nwas the wrong rule."
    paragraphs:
      - "The original validation was that a reading must be higher than the last one. It is obviously true — odometers do not run backwards — and it broke within days of going live. In February the first month of real submissions came in and customers started hitting the error on cars that genuinely had not moved. A van parked for four weeks reads the same as it did last month, and the form was calling that a mistake."
      - "My first response was to disable the check entirely, twice in one day, then re-enable it with an equality rule bolted on. That was worse: it still rejected a legitimate unchanged reading, just with different wording. The mistake was treating a data-integrity rule as a business rule. Nothing about a lease says the number must increase — what the business needed was one reading per car per calendar month, and the increase was incidental."
      - "The rewrite in March replaced it with exactly that. Duplicate submissions in the same month are caught by the month rule, monotonicity is enforced on edits where a correction really can invert history, and the unchanged reading — the case that broke it — is now just a valid answer. Two months of production use taught me the requirement that four weeks of building had not."
    flowLabel: "SUBMIT"
    flowSteps:
      - label: "1  Customer enters plate and reading"
      - label: "2  Device checks against last known"
      - label: "3  Server: already logged this month?"
        color: accent
      - label: "4  Server: lower than previous?"
      - label: "5  Write reading, show confirmation"
        color: green
    note: "An unchanged reading now passes — a parked car is a valid answer, not a validation failure."

  outcomeTitle: "Eight weeks to build,\ntwo days to find the bug."
  metrics:
    - value: "113"
      label: "Readings across 87 vehicles in the first month"
      color: green
    - value: "65%"
      label: "Of readings processed by staff without a phone call"
      color: accent
    - value: "41"
      label: "Commits over 58 days, 26 of them fixes"
      color: yellow
---
