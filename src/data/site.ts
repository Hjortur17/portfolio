/* Single source of truth for identity, links and the copy that appears in more
 * than one place. */

export const site = {
  name: 'Hjörtur Freyr',
  wordmark: 'HJORTUR FREYR',
  role: 'FULL STACK DEVELOPER',
  location: 'ICELAND',
  email: 'hjorturfreyr@hjorturfreyr.com',
  url: 'https://hjorturfreyr.com',
  description:
    'Full stack developer from Iceland — Laravel on the back, modern JavaScript on the front.',
};

export const socials = [
  { label: 'GITHUB', href: 'https://github.com/Hjortur17' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/hjortur-freyr/' },
  // { label: 'DRIBBBLE', href: 'https://dribbble.com/Hjortur17' },
  { label: 'EMAIL', href: `mailto:${site.email}` },
];

export type NavItem = {
  label: string;
  href: string;
  key: string;
  /** Always accent-coloured — the primary action, not a page state. */
  primary?: boolean;
};

export const nav: NavItem[] = [
  { label: 'ABOUT', href: '/#about', key: 'about' },
  { label: 'WORK', href: '/work', key: 'work' },
  { label: 'USES', href: '/uses', key: 'uses' },
  /* Accent-coloured as the primary action, not as a "current page". */
  { label: 'CONTACT', href: '/#contact', key: 'contact', primary: true },
];

/* Home page — the tools band. The short version of /uses. */
export const tools = [
  'NEXT.JS',
  'LARAVEL',
  'PRISMIC',
  'PRISMA',
  'DOCKER',
];
