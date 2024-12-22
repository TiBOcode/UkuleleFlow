import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([])
  })
});

export const collections = {
  notes
};