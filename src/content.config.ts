import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      /* Card + listing */
      level: z.number().int().positive(),
      title: z.string(),
      year: z.number().int(),
      status: z.enum(['shipped', 'loading', 'updated']),
      summary: z.string(),
      tags: z.array(z.string()),
      cover: image(),
      featured: z.boolean().default(false),
      order: z.number().int(),

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
          heroImage: image(),
          heroLabel: z.string().default('SCREEN-01.PNG'),

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
              image: image(),
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
          retrospective: z.array(z.string()),
        })
        .optional(),
    }),
});

export const collections = { projects };
