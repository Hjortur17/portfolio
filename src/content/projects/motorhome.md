---
level: 3
title: Motorhome.is
year: 2025
status: shipped
summary: "A campervan rental site for Iceland with the full booking funnel built in, search to payment. Content comes from a CMS; every price comes from the rental backend."
tags: ["NEXT.JS", "PRISMIC", "TAILWIND", "CAREN API"]
cover: ../../assets/projects/placeholder.webp
featured: true
order: 3
externalHref: https://motorhome.is
externalLabel: VISIT THE SITE
caseStudy:
  role: "Sole developer — architecture, frontend, API layer, CMS modelling, analytics, deploys"
  timeline: "Sep 2023 – Aug 2026 · rebuilt from scratch May 2025"
  stack: "Next.js 16, React 19, TypeScript, Prismic, Tailwind v4, Caren API, MapLibre, Sentry, Vercel"
  team: "Me on the build; the rental team owns content and pricing in Prismic"
  lead: "A motorhome rental company with a booking backend it did not control and a marketing site that could not talk to it. The site had to sell the trip and sell the van, and those two things lived in different systems."
  heroImage: ../../assets/projects/placeholder.webp
  heroLabel: "MOTORHOME-HERO.PNG"

  problemTitle: "Two systems, one\nbooking, no shared truth."
  problemBody:
    - "Every commercial fact — what vans exist, what they cost this week, what insurance applies, whether a seat is free — lives in Caren, an Icelandic rental platform the client already ran their fleet on. Everything that makes someone want the trip — photography, feature copy, campsite maps, blog posts — belongs in a CMS the rental team can edit without me. Neither system knows the other exists."
    - "The first version tried to close that gap by copying: a nightly cron pulled classes, countries, extras and insurances out of Caren into a local database, cached in Redis, and the site read from the copy. It was fast and it was frequently wrong. A price changed at 09:00 and the site kept quoting yesterday's number until midnight."
  problems:
    - "A nightly sync meant the site could quote a price the booking backend would refuse"
    - "Caren reports discounts as two anonymous buckets and never says what an individual coupon was worth"
    - "Vans were listed on the same page as editorial content, so one slow rental API call blocked the entire page from rendering"
    - "Caren accepts an invalid coupon code without complaining and just returns the same price"

  approachTitle: "Three decisions that\nshaped everything else."
  approachIntro: "The rewrite started from one rule: Caren owns money and availability, the CMS owns everything else, and nothing gets copied between them."
  decisions:
    - title: "Join on a number, not a sync"
      body: "Each vehicle in Prismic carries a single numeric `classid` matched against Caren's class ID at request time. Photography, the new-model badge and six categories of feature icons come from the CMS; specs, price and availability come from the API; they meet in one function and never in a database. There is no local copy to go stale."
      color: accent
    - title: "Put the rental API behind the app"
      body: "Sixteen route handlers stand between the browser and Caren, so the API key, username and rental ID stay server-side. It also means Caren's wire format — reservations expressed as nested string arrays, countries as proprietary numeric IDs — is translated once at the boundary instead of leaking into components."
      color: red
    - title: "Stream the shell, suspend the price"
      body: "The page starts the slow Caren fetches and deliberately does not await them. The promises are handed to the slices that need them and consumed inside Suspense, so navigation, hero and footer paint immediately while only the vehicle list waits. The slowest data in the product stopped being the thing that gated first paint."
      color: yellow

  buildSections:
    - eyebrow: "THE FUNNEL"
      color: accent
      title: "Six steps, one state machine"
      body: "Search, availability, insurance and extras, driver details, payment, confirmation — all of it driven by one context that mirrors itself into sessionStorage as it goes. Refreshing the page mid-booking does not lose the booking. Once a reservation exists in Caren, the details step stops creating and starts editing, and a deep comparison against a snapshot means it only calls the API when something actually changed."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "CONTENT MODEL"
      color: red
      title: "Thirteen slices the client can rearrange"
      body: "Pages are composed in Prismic from thirteen slices with eighteen variations, including one that mounts the entire booking widget — so the booking form is something an editor can place on a page rather than something I have to deploy. Navigation, footer, SEO metadata and a date-windowed site-wide banner are all CMS-owned. Vans get fifty-four hand-built feature icons across six categories."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "TRIP PLANNING"
      color: yellow
      title: "823 points of interest, served as static files"
      body: "Campsites, fuel and groceries on a MapLibre map of Iceland. Rather than query a live geo API on every page view, a one-shot script pulls the data out of OpenStreetMap's Overpass endpoint and writes static GeoJSON into the repo — 303 campsites, 263 gas stations, 257 grocery stores, 227 KB in total. The map has no runtime dependency on anything but the tile server."
      image: ../../assets/projects/placeholder.webp

  hardPart:
    title: "The coupon that\nrefuses to say its price."
    paragraphs:
      - "Caren reports discounts as two totals and never attributes an amount to an individual offer. So when a guest types a coupon code and the page has to show them what it saved, there is no field to read. Worse, Caren accepts a code that does not exist without raising an error — it just returns the same price back, which means a typo and a real discount are indistinguishable from the response alone."
      - "The fix is to measure the coupon rather than ask for it. Applying a code re-prices the booking twice against the same endpoint with the same parameters: once clean to establish a baseline, once with the code. The difference is the coupon's value, and if the total did not move, the code did nothing and the guest is told so. The named breakdown is then reconstructed by diffing the offers active before and after, and relabelled with the code the guest actually typed rather than Caren's internal name for it."
      - "The trap is that the baseline goes stale the moment anything else changes. A pricing fingerprint — reservation, vehicle, both dates, both times, insurance, and a sorted list of extras with quantities — invalidates the snapshot whenever the booking shifts underneath it. Struck-through prices sit next to live ones on that page, so a mismatch is not a rendering glitch, it is the site lying about money."
    flowLabel: "COUPON APPLY"
    flowSteps:
      - label: "1  Guest enters a code"
      - label: "2  Re-price with no coupon"
      - label: "3  Re-price with the coupon"
        color: accent
      - label: "4  Difference = the discount"
      - label: "5  Persist to the reservation"
        color: green
    note: "If the two prices come back equal, the code did nothing — that is the only signal Caren gives that a coupon was invalid."

  outcomeTitle: "One funnel, no\nnightly sync, live prices."
  metrics:
    - value: "452"
      label: "Commits across two full builds and one rewrite"
      color: green
    - value: "20,378"
      label: "Lines of TypeScript across 206 source files"
      color: accent
    - value: "0"
      label: "Cached commercial data — every price is live"
      color: yellow
  retrospective:
    - "The vehicle join fans out one CMS request per feature, per category, per vehicle. I hid that behind Suspense instead of fixing it, which made the page feel fast without making it cheap. Hiding latency is not the same as removing it, and the honest fix is one batched query."
    - "Two blog routes still carry commented-out `noindex` blocks marked 'fix before production'. They shipped. A TODO in metadata is not a note to self, it is a live SEO decision nobody made on purpose."
    - "There is no test suite. For a funnel that takes card payments and computes discounts by subtracting two API responses, that is the wrong place to have zero automated coverage — the coupon differential in particular is exactly the kind of logic that breaks silently and only shows up on an invoice."
    - "Rewriting from Strapi and Redis to Prismic was right, but the cut landed as a single commit that deleted the old app with no explanation attached. Two years from now the most consequential decision in this repo has no reasoning recorded anywhere."
---
