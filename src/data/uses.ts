/* The /uses page — "Loadout".
 *
 * EVERY value and note below is placeholder content lifted from the design
 * handoff. It is plausible for an Astro/Laravel developer but it is not the
 * real setup. Replace all of it, then update `lastUpdated`.
 *
 * The `note` is the reason this page uses a detail pane instead of a plain
 * list: a uses page without opinions is just a shopping receipt. One sentence
 * per item saying WHY you use it.
 */

export type UsesItem = {
  label: string;
  value: string;
  note: string;
  /** Present = the value renders as a link and Enter opens it. */
  href?: string;
};

export type UsesCategory = {
  name: string;
  /** From the site palette. One per category, fixed. */
  color: string;
  tagline: string;
  items: UsesItem[];
};

/** Rendered as "LAST UPDATED — AUG 2026". Kept explicit rather than read from
 *  file mtime, which does not survive a fresh clone. */
export const lastUpdated = '2026-08';

export const categories: UsesCategory[] = [
  {
    name: 'EQUIPPED',
    color: '#4CC9F0',
    tagline: 'WHERE THE HOURS GO',
    items: [
      { label: 'EDITOR', value: 'TODO', note: 'TODO — why this one and not the obvious alternative.' },
      { label: 'THEME', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'FONT', value: 'TODO', note: 'TODO — one sentence.', href: 'https://example.com' },
      { label: 'EXTENSIONS', value: 'TODO, TODO, TODO', note: 'TODO — the three that earn their keep.' },
    ],
  },
  {
    name: 'TERMINAL',
    color: '#7CE04A',
    tagline: 'SECOND HOME',
    items: [
      { label: 'EMULATOR', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'SHELL', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'MULTIPLEXER', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'DOTFILES', value: 'TODO', note: 'TODO — public or private, and what manages them.', href: 'https://github.com/Hjortur17' },
    ],
  },
  {
    name: 'WORKSHOP',
    color: '#FFC53D',
    tagline: 'LOCAL MACHINERY',
    items: [
      { label: 'RUNTIMES', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'LOCAL ENV', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'CONTAINERS', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'DB CLIENT', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'API CLIENT', value: 'TODO', note: 'TODO — one sentence.' },
    ],
  },
  {
    name: 'SERVICES',
    color: '#FF3B5C',
    tagline: 'WHERE IT ALL RUNS',
    items: [
      { label: 'HOSTING', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'DATABASE', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'STORAGE', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'ERRORS', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'ANALYTICS', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'CI', value: 'TODO', note: 'TODO — one sentence.' },
    ],
  },
  {
    name: 'BATTLESTATION',
    color: '#B98CFF',
    tagline: 'THE PHYSICAL LAYER',
    items: [
      { label: 'MACHINE', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'DISPLAY', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'KEYBOARD', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'AUDIO', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'DESK', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'CHAIR', value: 'TODO', note: 'TODO — one sentence.' },
    ],
  },
  {
    name: 'MISC',
    color: '#FF8A3D',
    tagline: 'EVERYTHING ELSE',
    items: [
      { label: 'DESIGN', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'SCREENSHOTS', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'NOTES', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'PASSWORDS', value: 'TODO', note: 'TODO — one sentence.' },
      { label: 'BROWSER', value: 'TODO', note: 'TODO — one sentence.' },
    ],
  },
];
