---
level: 6
title: Route 1
year: 2023
status: shipped
summary: "A brand site for an Icelandic car rental, built on a flat-file CMS with no database. Reservations went to a specialist vendor — the decision the project turns on."
tags: ["STATAMIC", "VUE", "TAILWIND", "LARAVEL"]
cover: ../../assets/projects/placeholder.webp
featured: false
order: 6
caseStudy:
  role: "Sole developer — content model, templates, design system, front-end components"
  timeline: "Jan 2023 · three weeks, start to launch"
  stack: "Statamic 3 on Laravel 9, Vue 3, Tailwind 2, Laravel Mix, flat-file content"
  team: "Me, building against an existing brand and an existing booking vendor"
  lead: "A car rental brand that needed a website, not a booking system — because the booking system already existed and belonged to someone else."
  heroImage: ../../assets/projects/placeholder.webp
  heroLabel: "ROUTE1-HERO.PNG"

  problemTitle: "The interesting part\nwas already bought."
  problemBody:
    - "The reservations ran on Caren, the platform the business already managed its fleet, rates and contracts on. Rebuilding search, availability, pricing and payment in a new site would have meant a second source of truth for the fleet, a second place for rates to be wrong, and a payment integration to certify — for a brand site with a three-week window."
    - "So the scope became honest very early: everything except reservations. That sounds like a smaller project, and it is, but it moves the difficulty rather than removing it. If the site is not the booking engine then it has to be genuinely good at the thing it is — content the business can change without a developer."
  problems:
    - "Rates and fleet data already lived in a system the site could not own"
    - "A database-backed CMS meant hosting and migrations for a site that publishes text"
    - "Marketing needed to add and reorder pages without waiting for a deploy"
    - "The vendor's booking widget is an opaque script that has to sit inside editable content"

  approachTitle: "Three decisions that\nshaped everything else."
  approachIntro: "Every one of these follows from deciding not to build the booking engine."
  decisions:
    - title: "Buy the reservations, build the brand"
      body: "The booking flow is the vendor's widget, mounted on a page. There is a fieldset in this repo called `booking_system` with no fields in it — the stub of a native booking system that was scoped and deliberately never built. It is the most honest artefact in the project."
      color: accent
    - title: "Flat files instead of a database"
      body: "Statamic stores content as markdown and YAML in the repo. No database, no migrations, no separate backup story, and content changes arrive as commits you can read in a diff. For a site whose entire job is publishing text, a database would have been infrastructure bought for nothing."
      color: red
    - title: "Vue as islands, not an app"
      body: "Two components — an FAQ accordion and a testimonial carousel — mount onto server-rendered HTML. Content reaches them by being serialised straight into props from the template, so there is no JSON endpoint and no API layer for a site that does not need one."
      color: yellow

  buildSections:
    - eyebrow: "CONTENT MODEL"
      color: accent
      title: "Pages composed from blocks"
      body: "Five blueprints and four reusable fieldsets over a nested page tree, with a repeater of sections that carries its own layout toggles — background on or off, border on or off — resolved into Tailwind classes in the template. Marketing composes a page from blocks and controls how each one looks without touching code."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "THE ESCAPE HATCH"
      color: red
      title: "A rich-text field that accepts a script"
      body: "Inner pages have a code-snippet field, which is how the vendor's booking widget gets onto a page at all. It means an editor can move the booking form, or add it to a new landing page, without a deploy. It also means the site trusts whatever gets pasted into it — a deliberate trade for a small team where the only people with CMS access are the ones who own the brand."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "DESIGN SYSTEM"
      color: yellow
      title: "Type scale on bare elements"
      body: "The global type scale is applied to unstyled heading elements in CSS rather than as classes in templates, so rich text authored in the CMS comes out correctly styled without an editor knowing anything about the design system. Brand colour and a nine-step neutral ramp sit in the Tailwind config, which is what made the second brand a config change rather than a rewrite."
      image: ../../assets/projects/placeholder.webp

  hardPart:
    title: "The build that proved\nitself three months later."
    paragraphs:
      - "The genuinely hard problem on this project was not technical, and pretending otherwise would misrepresent it. There is no availability logic here, no pricing engine, no payment integration and no double-booking to prevent — all of that is the vendor's, by choice. The hard part was deciding that, and then building the remaining seventy percent well enough that the decision paid off."
      - "It paid off in April. A second Icelandic car rental brand needed a site, and this codebase was redeployed as that brand in nine days — same starter, same blueprint structure, same components, a new palette and new content. The blueprint-and-fieldset content model and the CSS-level type scale were what made that possible; if the design had been hardcoded into templates, the second brand would have been another three weeks."
      - "What I would not claim is that everything shipped clean. The testimonial carousel was built, then commented out of the homepage with a note that it broke page scrolling, and it stayed that way. Placeholder testimonials and two lorem-ipsum blog posts went live. The site was structurally finished before it was actually finished, which is a distinction that is easy to lose when the launch date is the goal."
    flowLabel: "PUBLISH"
    flowSteps:
      - label: "1  Editor composes blocks in the CMS"
      - label: "2  Content saves as markdown in the repo"
      - label: "3  Statamic resolves the URL from the tree"
        color: accent
      - label: "4  Antlers renders server-side HTML"
      - label: "5  Vue mounts onto what is already there"
        color: green
    note: "The booking widget is pasted into content, not code — so moving it is an edit, not a deploy."

  outcomeTitle: "Three weeks to launch.\nNine days to do it again."
  metrics:
    - value: "20"
      label: "Days from empty repo to launch"
      color: green
    - value: "9"
      label: "Days to redeploy the codebase as a second brand"
      color: accent
    - value: "0"
      label: "Databases, migrations and booking code written"
      color: yellow
  retrospective:
    - "Compiled assets went into version control and back out again across three commits, with one message that just says the production build script was giving trouble. The repo's final state has build artefacts committed. I never sorted the build properly and worked around it instead, which is exactly the kind of thing that stays broken because it is never quite blocking."
    - "Placeholder content shipped. Lorem ipsum testimonials with stock headshots and two untitled blog posts were live on a real brand's site. 'Site complete' meant the templates were complete, and I did not draw a line between those two things clearly enough."
    - "The vendor's booking script is embedded three separate times — twice pasted into content, once hardcoded in a template — and two of those point at different widget configurations. It should have been one partial with one source of truth. Copy-paste in content is still copy-paste."
    - "The widget points at the vendor's development endpoint rather than a production one. Whether that was ever corrected before launch, I cannot tell from this repo, and that I cannot tell is itself the problem."
---
