---
level: 4
title: Gjafalistar.is
year: 2025
status: loading
summary: "An Icelandic gift registry. Paste a product link and it pulls the title and image off the page — everything works except reserving an item, which is the point."
tags: ["NEXT.JS", "REACT", "LARAVEL", "TAILWIND"]
screenshot: ""
brand: '#D98A1F'
domain: GJAFALISTAR.IS
featured: false
order: 1
caseStudy:
  role: "Sole developer — API, frontend, auth, deploys"
  timeline: "Jun 2024 – Nov 2025, in five bursts with long gaps · unfinished"
  stack: "Next.js 15, React 19, TypeScript, Laravel 11, Sanctum, NextAuth, Tailwind v4, Sentry"
  team: "Just me, in spare time"
  lead: "A gift registry for Icelandic occasions — birthdays, weddings, christenings, graduations. Everything around the idea got built. The idea itself did not."

  problemTitle: "Adding a gift should\ntake one paste."
  problemBody:
    - "Every gift list app asks you to type a product name, a price, and a link, and then find an image. That is four fields of friction on a task people do fifteen times in one sitting before a wedding. If adding an item is tedious, the list never gets finished, and an unfinished registry is worse than none because people buy off it anyway."
    - "So the interaction is a single paste. The URL goes in, the server fetches the page, reads its metadata, and the item appears with a title and an image already attached. Getting that to work reliably across arbitrary Icelandic and international retailers turned out to be most of the project — and it is the part I ended up rebuilding worse."
  problems:
    - "Retailers structure product metadata inconsistently, and some block server-side fetches outright"
    - "Two people buying from the same list have no way to coordinate without spoiling the surprise"
    - "The list owner must not see who reserved what, which makes it an access-control problem, not a UI one"
    - "Guests should not need an account to give a gift, but the whole API sits behind authentication"

  approachTitle: "Three decisions that\nshaped everything else."
  approachIntro: "Two of these were right. The third is why the project is unfinished."
  decisions:
    - title: "Scrape the page, do not ask the user"
      body: "Adding an item is one field. The server fetches the URL and reads structured metadata, Open Graph tags, and finally the plain title tag, resolving relative image URLs to absolute so images from smaller shops actually load. There is no manual entry form anywhere in the product, which was the whole point."
      color: accent
    - title: "Headless Laravel behind a React app"
      body: "A JSON API with token authentication and a separate Next.js frontend, rather than server-rendered Laravel. It made the mobile-first list UI far easier to build and it is why membership, roles and policies live cleanly in one place. It also doubled the auth surface, which is where the bugs are."
      color: red
    - title: "Model roles before modelling reservations"
      body: "Owner, collaborator and viewer went into a membership table early, with a policy layer and tests. Reserving an item — the actual product — was left as markup. I built the permissions system for a feature that did not exist yet, and then never built the feature."
      color: yellow

  buildSections:
    - eyebrow: "THE PASTE"
      color: accent
      title: "One field, three fallbacks"
      body: "The first scraper ran server-side in Laravel with a proper cascade: structured product data first, then Open Graph tags, then the bare page title, each tier wrapped in its own error handling. It is the best code in either repository. It is also dead — nothing calls it any more."
      image: ""
    - eyebrow: "OCCASIONS"
      color: red
      title: "Seven Icelandic occasions, colour-coded"
      body: "Birthdays, weddings, Christmas, summer, graduations, christenings and other — seeded as types rather than free text, each mapped to its own colour throughout the interface. The routes are Icelandic too, all the way down. Names run through a hand-written transliteration table that maps Þ, Ð, Æ, Ö and Ý to ASCII so the avatar service returns correct initials instead of question marks."
      image: ""
    - eyebrow: "COLLABORATION"
      color: yellow
      title: "Roles, policies, and tests for them"
      body: "Lists have members with roles, guarded by a policy and gated in the interface so only an owner sees edit controls. There is a complete friend-request lifecycle behind it — send, accept, decline, unfriend — with five passing tests and no user interface at all. It is finished code for a screen that was never built."
      image: ""

  hardPart:
    title: "I rewrote the good\nscraper into a worse one."
    paragraphs:
      - "The Laravel scraper kept getting blocked. Retailers refuse requests from datacentre IPs, and five commits in a row are just debugging that fight. The fix I reached for was to move scraping into the Next.js app, where the request comes from a different place and can carry a browser user agent. That solved the blocking."
      - "It also threw away the parser. The new version reads the page with regular expressions over raw HTML and dropped the structured-data tier entirely, so it now handles fewer sites correctly than the code it replaced. I fixed a delivery problem by rewriting the part that was working, and the dependencies for the old parser are still sitting in the manifest, unused."
      - "That rewrite is the last substantial thing I did on this project. It landed at the end of October 2025, alongside a half-applied migration to a new component library, and the work stopped there with the tree still dirty. The reservation feature — the reason to build a gift registry at all — exists as commented-out markup showing exactly what it should look like, next to a button with no handler behind it."
    flowLabel: "ADD AN ITEM"
    flowSteps:
      - label: "1  Paste a product URL"
      - label: "2  Server fetches the page"
      - label: "3  Read metadata, resolve image URL"
        color: accent
      - label: "4  Optimistic row appears"
      - label: "5  Save, deduplicated by URL"
        color: green
    note: "If the fetch fails the row is removed and the user gets an alert — which is where a manual-entry fallback should be, and is not."

  outcomeTitle: "Deployed, working, and\nmissing the point."
  metrics:
    - value: "35%"
      label: "Complete as a gift registry, by my own estimate"
      color: yellow
    - value: "25"
      label: "Backend tests passing across 10 files"
      color: accent
    - value: "0"
      label: "Lines of reservation logic written"
      color: red
---
