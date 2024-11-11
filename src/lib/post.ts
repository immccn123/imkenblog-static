import { glob } from 'glob';
import * as fs from 'node:fs/promises';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkFromtmatter from 'remark-frontmatter';
import * as toml from 'js-toml';
import type { VFile } from 'vfile';

declare module 'vfile' {
	interface DataMap {
		frontmatter: {
			title?: string;
		};
		title: string;
	}
}

export default function remarkFirstH1Line() {
	return (_: import('mdast').Root, file: VFile) => {
		if (file.data.frontmatter?.title) {
			file.data.title = file.data.frontmatter.title;
			return;
		}
		const fileContent =
			typeof file.value === 'string' ? file.value : new TextDecoder('utf-8').decode(file.value);
		const rawContent = fileContent.split('\n');
		const h1LineIndex = rawContent.findIndex((line) => line.startsWith('# '));
		if (h1LineIndex !== -1) {
			file.data.title = rawContent[h1LineIndex].slice(2).trim();
		}
	};
}

function getFrontmatter() {
	return (ast: import('mdast').Root, vfile: VFile) => {
		for (const node of ast.children) {
			if (node.type === 'yaml') {
				const doc = toml.load(node.value);
				vfile.data.frontmatter = doc;
			}
		}
	};
}

const markdownProcesser = remark()
	.use(remarkGfm)
	.use(remarkFromtmatter, ['toml', 'yaml'])
	.use(remarkMath)
	.use(getFrontmatter)
	.use(remarkFirstH1Line)
	.use(remarkRehype)
	.use(rehypeKatex)
	.use(rehypeShiki, {
		themes: { light: 'vitesse-light' }
	})
	.use(rehypeStringify);

type Cache = ReturnType<typeof getPost>

const cache: Cache | undefined = undefined;

export async function getPostWithCache() {
	if (cache) return cache;
	return await getPost()
}

export async function getPost() {
	const globs = await glob(`${import.meta.dirname}/../posts/*.md`);
	const result = [];

	for (const filename of globs) {
		const markdown = await fs.readFile(filename, {
			encoding: 'utf-8'
		});
		const processed = await markdownProcesser.process(markdown);
		const frontmatter = processed.data.frontmatter;
		const title = processed.data.title ?? "untitled";
		const html = processed.toString();
		result.push({ frontmatter, html, title });
	}
	return result;
}
