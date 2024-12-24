import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([])
  })
});

const flows = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    videoId: z.string(),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([])
  })
});

export const collections = {
  notes,
  flows
};