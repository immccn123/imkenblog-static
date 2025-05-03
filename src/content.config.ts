import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		// Transform string to Date object
		date: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		header: z.string().optional(),
		priority: z.number().default(0),
		tags: z.array(z.string()).default([]),
		categories: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		series: z.object({
			name: z.string().optional(),
			description: z.string().optional(),
			order: z.number().default(0),

			slug: z.string(),
		}).optional(),
	}),
});

export const collections = { blog };
