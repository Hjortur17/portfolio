import { site, socials } from '../data/site';

/** Google truncates around 155–160 characters. Anything past that is weight
 *  in the HTML that no one will ever read in a result. */
const META_DESCRIPTION_MAX = 155;

/** Trim to the last full word inside the limit, so a description never ends
 *  mid-word before the ellipsis. */
export function metaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\-—]$/, '')}…`;
}

/** The homepage's identity graph. `sameAs` is what lets a crawler connect this
 *  site to the GitHub and LinkedIn profiles as one person rather than three
 *  unrelated pages. */
export function personSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: 'Full Stack Developer',
    description: site.description,
    address: { '@type': 'PostalAddress', addressCountry: 'IS' },
    sameAs: socials
      .filter((s) => s.href.startsWith('http'))
      .map((s) => s.href),
    mainEntityOfPage: url,
  };
}

/** A case study is a piece of writing *about* a project, so the page is an
 *  Article whose `about` is the software. Describing it only as an Article
 *  loses the project; only as SoftwareApplication loses the authorship. */
export function caseStudySchema(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  year: number;
  tags: string[];
  externalHref?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    author: { '@type': 'Person', name: site.name, url: site.url },
    publisher: { '@type': 'Person', name: site.name, url: site.url },
    inLanguage: 'en',
    /* Year only — the frontmatter has no finer date, and inventing a month
       would put a false precision in the search result. */
    datePublished: String(opts.year),
    keywords: opts.tags.join(', '),
    about: {
      '@type': 'SoftwareApplication',
      name: opts.title,
      applicationCategory: 'WebApplication',
      ...(opts.externalHref ? { url: opts.externalHref } : {}),
    },
  };
}

/** /work is a list page; telling a crawler the order makes the individual case
 *  studies discoverable as a set rather than as loose links. */
export function workListSchema(
  url: string,
  items: { title: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected work',
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.title,
        url: it.url,
      })),
    },
  };
}
