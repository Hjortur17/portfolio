import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) => {
    /* A project can be written up before it has been photographed. An empty
       string means "not shot yet" and renders as a blank screen inside the
       plate, rather than failing the build the way a dangling path would. */
    const pendingImage = () =>
      z.union([z.literal('').transform(() => undefined), image()]).optional();

    return z.object({
      /* Card + listing */
      level: z.number().int().positive(),
      title: z.string(),
      year: z.number().int(),
      status: z.enum(['shipped', 'loading', 'updated']),
      summary: z.string(),
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
      order: z.number().int(),

      /* Imagery — one 2560×1440 viewport capture per project, composed into
         the card's cover plate and the case study's hero plate at render time.
         Shoot one file, never two: the two plates differ only in chrome. */
      screenshot: pendingImage(),
      /* One colour pulled from the real product. The plate's field and third
         block derive from it; override them only when a derived tone fights
         the brand. */
      brand: z.string(),
      field: z.string().optional(),
      block: z.string().optional(),
      /* Baked into the hero plate's title bar. */
      domain: z.string(),
      /* When the brand colour lands within ~20° of a portfolio accent, the
         page substitutes its own accent rather than changing the brand — so
         the two never appear together. motorhome.is red (#C0392B) against the
         portfolio's #FF3B5C is the case this exists for. */
      accentSwap: z
        .object({
          role: z.enum(['accent', 'red', 'yellow', 'green', 'violet']),
          with: z.enum(['accent', 'red', 'yellow', 'green', 'violet']),
        })
        .optional(),

      /* Cards with no case study link out instead */
      externalHref: z.string().url().optional(),
      externalLabel: z.string().default('VIEW PROJECT'),

      /* Present = this project gets a /work/<slug> page */
      caseStudy: z
        .object({
          role: z.string(),
          timeline: z.string(),
          stack: z.string(),
          team: z.string(),
          lead: z.string(),

          problems: z.array(z.string()),
          problemTitle: z.string(),
          problemBody: z.array(z.string()),

          approachTitle: z.string(),
          approachIntro: z.string(),
          decisions: z
            .array(
              z.object({
                title: z.string(),
                body: z.string(),
                color: z.enum(['accent', 'red', 'yellow']),
              })
            )
            .max(3),

          buildSections: z.array(
            z.object({
              eyebrow: z.string(),
              color: z.enum(['accent', 'red', 'yellow', 'green', 'violet']),
              title: z.string(),
              body: z.string(),
              image: pendingImage(),
              caption: z.string().optional(),
            })
          ),

          hardPart: z.object({
            title: z.string(),
            paragraphs: z.array(z.string()),
            flowLabel: z.string().default('FLOW'),
            flowSteps: z.array(
              z.object({
                label: z.string(),
                color: z.enum(['accent', 'green', 'violet']).optional(),
              })
            ),
            note: z.string(),
          }),

          outcomeTitle: z.string(),
          metrics: z
            .array(
              z.object({
                value: z.string(),
                label: z.string(),
                color: z.enum(['accent', 'red', 'green', 'yellow']),
              })
            )
            .max(3),
          quote: z
            .object({ text: z.string(), attribution: z.string() })
            .optional(),
        })
        .optional(),
    });
  },
});

export const collections = { projects };
