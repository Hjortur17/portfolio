---
level: 5
title: PosterQuest
year: 2025
status: shipped
summary: "A daily movie-guessing game. Everyone gets the same poster, pixelated into unreadability, and five guesses — each wrong answer sharpens the image one step."
tags: ["NEXT.JS", "REACT", "SUPABASE", "TMDB API"]
cover: ../../assets/projects/placeholder.webp
featured: false
order: 5
caseStudy:
  role: "Sole developer and designer — game design, frontend, API layer, database, deploys"
  timeline: "Dec 2025 – Jun 2026, nights and weekends"
  stack: "Next.js 16, React 19, TypeScript, Tailwind v4, Supabase (Postgres), TMDB API, Vercel Cron"
  team: "Just me"
  lead: "A daily guessing game built around one idea: a movie poster is still recognisable long after it stops being readable. The whole build is an argument with that idea — how much can you take away before the picture stops being a puzzle and starts being noise?"
  heroImage: ../../assets/projects/placeholder.webp
  heroLabel: "POSTERQUEST-HERO.PNG"

  problemTitle: "The answer is the image.\nSo the image can never load."
  problemBody:
    - "Every daily puzzle game has the same structural weakness: the answer has to reach the browser before the player earns it. Wordle gets away with it because the answer is five letters buried in a word list. Here the answer *is* the artwork — one `<img>` tag pointed at the TMDB CDN and the game is over before the first guess."
    - "The obvious fix is to pixelate on the server and only ever ship the degraded image. I built the route for it and then didn't use it. Server-side pixelation means an image round-trip on every single guess, and the whole feel of the game is that the poster sharpens *instantly* when you're wrong. The latency would have cost more than the leak."
  problems:
    - "The poster URL alone gives away the answer — no guessing required"
    - "A failed pixelation pass silently falls back to the original image, which is the worst possible failure mode"
    - "Returning players had the previous day's un-pixelated poster still sitting in localStorage"
    - "Everyone worldwide has to get the same movie on the same day, decided by three different processes that never talk to each other"

  approachTitle: "Three decisions that\nshaped everything else."
  approachIntro: "Two of these are about protecting the answer. The third is about making a random daily pick behave like a scheduled one."
  decisions:
    - title: "Pixelate on the client, never trust the source"
      body: "The poster is drawn to a canvas, downscaled to 2–32 pixel blocks with smoothing off, upscaled back, and read out as a data URL. The original never renders. If pixelation throws, the code retries at maximum obscurity rather than falling back to the real image — and if the retry also fails, the poster stays in its loading state forever. A visible bug beats a spoiled puzzle."
      color: accent
    - title: "Proxy every TMDB call server-side"
      body: "Six route handlers stand between the browser and TMDB, so the API key never ships to the client. The credits route is the clearest case: the game needs to know a film's director to detect near-miss guesses, so the endpoint returns a single `director_id` and nothing else. The client is told what it needs, not what it asked for."
      color: red
    - title: "Pick tomorrow's movie today"
      body: "A Vercel cron runs at 00:00 UTC, picks the next day's film, and upserts it into Postgres keyed by date. The live route reads that cache first and only falls back to picking one itself. The daily movie stops being a computation the first player triggers and becomes a row that already exists."
      color: yellow

  buildSections:
    - eyebrow: "THE PIXELATION CURVE"
      color: accent
      title: "Five levels, tuned by eye"
      body: "Pixel block size runs 80 → 60 → 40 → 25 → 15, and the numbers came from playing rather than from theory. The original plan stepped down to a clean zero on the last guess; that turned the fifth guess into a giveaway, so the floor moved up to 15 and full resolution now only arrives when the game is actually over. Two canvases handle it — one to shrink, one to blow it back up with `imageSmoothingEnabled` off, which is what gives the blocks their hard edges instead of a blur."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "THE LINK HINT"
      color: red
      title: "A wrong guess that means something"
      body: "Guess a film that shares a franchise, a director, or three or more genres with the answer and the row lights amber instead of red. It is the one mechanic that makes wrong answers informative, and it took the most tuning: matching on production company was tried and removed, because major studios connect films that have nothing to do with each other, and the genre threshold climbed to three before it stopped firing on every blockbuster."
      image: ../../assets/projects/placeholder.webp
    - eyebrow: "SHARE + STATS"
      color: yellow
      title: "The part that makes it a daily habit"
      body: "An emoji grid — green hit, amber link, orange skip, red miss — plus a stats panel with win rate, guess histogram, and a streak counter computed over UTC calendar days. The share button falls through three APIs before giving up: the async clipboard, then `execCommand`, then the native share sheet. There is also a skip: burn a guess to sharpen the poster without answering, which reads as an orange square to everyone you send the grid to."
      image: ../../assets/projects/placeholder.webp

  hardPart:
    title: "Three processes, one\nmovie, no coordination."
    paragraphs:
      - "The daily pick has to be identical for every player, and it gets decided in three different places: the cron at midnight, the live API route when the cache is cold, and the client reading it back. There is no shared state between them at the moment of the decision. The pick is a seeded pseudo-random index — `sin(seed) * 10000`, keyed on the UTC date — over a candidate pool pulled from TMDB's discover endpoint."
      - "That works right up until the pool shifts. TMDB sorts by popularity, popularity moves daily, and the same seed against a reordered list returns a different film. So the seed stopped being the source of truth and the database did: the cron writes the chosen movie into a `daily_movies` row keyed by date, and every other path reads that row before it considers picking anything itself. The seeded function survives only as the cold-start fallback."
      - "On top of that sits a 200-day repeat window — the cron reads back recently used movie IDs and re-rolls if it lands on one. Against a pool of roughly sixty candidates that constraint is genuinely tight, so both paths log the squeeze and fall back to the unfiltered list rather than fail. A repeat is a bad day. No movie at all is a broken game."
    flowLabel: "DAILY PICK"
    flowSteps:
      - label: "1  00:00 UTC — cron fires"
      - label: "2  Pull ~60 candidates from TMDB"
      - label: "3  Re-roll against 200-day history"
        color: accent
      - label: "4  Upsert into daily_movies"
      - label: "5  First player reads a cached row"
        color: green
    note: "If the cron never ran, the first request of the day picks the movie itself and writes it back — slower for one player, correct for everyone after."

  outcomeTitle: "It works, and the\nleak is still there."
  metrics:
    - value: "3,253"
      label: "Lines of TypeScript across 31 source files"
      color: green
    - value: "5"
      label: "Guesses, five pixelation levels, one movie a day"
      color: accent
    - value: "200"
      label: "Day window before a film can repeat"
      color: yellow
  retrospective:
    - "The anti-leak work is defence in depth on the wrong layer. The rendering path is careful — four separate `CRITICAL` comments guard it — but `/api/tmdb/daily` still returns the full movie object, title and poster path included, to anyone who curls it, and the client caches that object in localStorage. I hardened the part I could see instead of the part that mattered. The real fix is to send the browser only what it needs to draw a pixelated image and to hold the title server-side until a guess comes in."
    - "The seeded-random function and its sixty-line candidate fetch are copy-pasted verbatim into two route handlers, and they have to stay bit-identical or the cron and the fallback disagree about what day it is. I knew that was wrong while I was doing it. It should have been one module from the start."
    - "Every RLS policy on the database is `true`, and the cron writes with the same anonymous key the browser holds — so anyone with that key can overwrite the day's movie. It needs a service role for writes and a read-only policy for everything else. That one is a real hole, not a rough edge."
    - "The Dockerfile has been in the repo since the second commit and has never worked; it copies a standalone build the config never produces. Vercel was always the deployment target. It should have been deleted the day that became true."
---
