/* The /uses page — "Loadout".
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
      { label: 'EDITOR', value: 'VSCode', note: 'TRIED CURSOR AND ZED. KEPT COMING BACK TO THIS', href: 'https://code.visualstudio.com/'},
      { label: 'THEME', value: 'Dark Modern', note: 'LOW CONTRAST ENOUGH FOR A FULL DAY STARING AT IT' },
      { label: 'FONT', value: 'PT Mono', note: 'MONOSPACE THAT DOESNT FEEL CRAMPED AT SMALL SIZES', href: 'https://fonts.google.com/specimen/PT+Mono' },
    ],
  },
  {
    name: 'WORKSHOP',
    color: '#FFC53D',
    tagline: 'LOCAL MACHINERY',
    items: [
      { label: 'RUNTIMES', value: 'NODE / HERD', note: 'NODE FOR NEXT, PHP THROUGH HERD FOR LARAVEL' },
      { label: 'LOCAL ENV', value: 'HERD', note: 'ONE CLICK AND THE SITE IS RUNNING. NO DOCKER NEEDED' },
      { label: 'CONTAINERS', value: 'DOCKER DESKTOP', note: 'FOR EVERYTHING THAT ISNT PHP' },
      { label: 'DB CLIENT', value: 'TABLEPLUS', note: 'FAST TO OPEN. FAST TO GET OUT OF THE WAY' },
      { label: 'API CLIENT', value: 'POSTMAN', note: 'WHERE EVERY ENDPOINT GETS POKED BEFORE THE FRONTEND SEES IT' },
    ],
  },
  {
    name: 'SERVICES',
    color: '#FF3B5C',
    tagline: 'WHERE IT ALL RUNS',
    items: [
      { label: 'HOSTING', value: 'VERCEL', note: 'PUSH TO MAIN AND ITS LIVE', href: 'https://vercel.com/' },
      { label: 'DATABASE', value: 'FORGE', note: 'MYSQL PROVISIONED AND MANAGED THROUGH FORGE', href: 'https://forge.laravel.com/' },
      { label: 'STORAGE', value: 'DIGITALOCEAN', note: 'SPACES FOR ANYTHING THAT ISNT A DATABASE ROW', href: 'https://www.digitalocean.com/' },
      { label: 'ERRORS', value: 'SENTRY', note: 'FIRST PLACE I LOOK WHEN SOMETHING BREAKS IN PROD', href: 'https://sentry.io/' },
      { label: 'ANALYTICS', value: 'GOOGLE', note: 'JUST ENOUGH TO SEE WHO IS ACTUALLY VISITING', href: 'https://analytics.google.com/' },
      { label: 'COOKIE CONSENT', value: 'COOKIEHUB', note: 'GDPR HANDLED SO ANALYTICS DOESNT FIRE UNINVITED', href: 'https://www.cookiehub.com/' },
      { label: 'CI', value: 'GITHUB', note: 'ACTIONS RUN THE TESTS BEFORE ANYTHING SHIPS', href: 'https://github.com/' },
    ],
  },
  {
    name: 'BATTLESTATION',
    color: '#B98CFF',
    tagline: 'THE PHYSICAL LAYER',
    items: [
      { label: 'MACHINE', value: 'MacBook Pro 16" M3 Pro', note: 'ABSOLUTE BEAST. NOTHING IT CANT HANDLE' },
      { label: 'DISPLAY', value: '2x 27" 2K LENOVO', note: 'ONE VERTICAL, ANOTHER HORIZONTAL' },
      { label: 'KEYBOARD', value: 'MX KEYS', note: 'SO HANDY TO SWITCH BETWEEN SOURCES', href: 'https://www.logitech.com/en-us/shop/p/mx-keys-s-for-mac-refurbished.996-000558?sp=7&searchclick=Logitech' },
      { label: 'MOUSE', value: 'MX MASTER 4', note: 'BEST MOUSE I HAVE EVER USED', href: 'https://www.logitech.com/en-us/shop/p/mx-master-4-mac.910-007575?sp=2&searchclick=Logitech' },
    ],
  },
  {
    name: 'MISC',
    color: '#FF8A3D',
    tagline: 'EVERYTHING ELSE',
    items: [
      { label: 'DESIGN', value: 'FIGMA', note: 'WHENEVER I NEED TO DESIGN SOMETHING', href: 'https://www.figma.com/' },
      { label: 'NOTES', value: 'NOTES', note: 'APPLE NOTES DOES SOLID JOB' },
      { label: 'BROWSER', value: 'SAFARI / CHROME', note: 'SAFARI DAILY. CHROME DEVELOPING' },
    ],
  },
];
