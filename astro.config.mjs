// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import icons from "unplugin-icons/vite";
import tailwindcss from "@tailwindcss/vite";

import remarkFrontmatter from "remark-frontmatter";
import rehypeShiki from "@shikijs/rehype";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeRewriteUrl } from "./src/markdownPlugins";

import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers";

const icoAstro = icons({ compiler: "astro" }),
	icoSv = icons({ compiler: "svelte" });

// https://astro.build/config
export default defineConfig({
	site: "https://static-blog.imken.moe",
	integrations: [sitemap(), svelte()],
	markdown: {
		syntaxHighlight: false,
		remarkPlugins: [[remarkFrontmatter, ["toml", "yaml"]], remarkMath],
		rehypePlugins: [
			[
				rehypeShiki,
				{
					theme: "vitesse-light",
					transformers: [transformerNotationDiff(), transformerNotationHighlight()],
				},
			],
			rehypeKatex,
			rehypeRewriteUrl,
			rehypeSlug,
			[rehypeAutolinkHeadings, { behavior: "prepend" }],
		],
	},
	vite: {
		plugins: [
			tailwindcss(),
			{
				name: "unplugin-icon-autofit",
				...icoSv,
				async load(id) {
					return await (id.endsWith(".svelte")
						? // @ts-ignore
						  icoSv.load(id)
						: // @ts-ignore
						  icoAstro.load(id));
				},
			},
		],
	},
});
