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
import { JSDOM } from 'jsdom';
import type { VFile } from 'vfile';
import path from 'node:path';

const PER_PAGE = 10;

declare module 'vfile' {
	interface DataMap {
		frontmatter: {
			title?: string;
			date?: string;
			tags?: string[];
			categories?: string[];
			description?: string;
			priority?: number;
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

let posts: App.Post[] = [];
let byTag: Record<string, App.Post[]> = {};
let byCategory: Record<string, App.Post[]> = {};
let byDate: Record<number, Record<number, App.Post[]>> & Object = {};
let paginatedPosts: App.Post[][] = [];
let isCached = false;
let sortedByDate: SortedPostsTimelineItem[] = [];
let slugMap = new Map<string, App.Post>();

type SortedPostsTimelineItem = {
	year: number;
	months: {
		month: number;
		posts: App.Post[];
	}[];
};

if (import.meta.hot) {
	import.meta.hot.on('full-reload', () => {
		isCached = false;
	});
}

export async function getPost() {
	if (isCached) {
		return { posts, byTag, byCategory, byDate, paginatedPosts, sortedByDate, slugMap };
	}

	const globs = await glob(`${import.meta.dirname}/../posts/*.md`);
	const result = [];
	byTag = {};
	byCategory = {};
	byDate = {};
	paginatedPosts = [];
	slugMap.clear();

	for (const filename of globs) {
		const slug = path.parse(filename).name;
		const markdown = await fs.readFile(filename, {
			encoding: 'utf-8'
		});
		const processed = await markdownProcesser.process(markdown);
		const frontmatter = processed.data.frontmatter ?? {};
		const title = processed.data.title ?? 'untitled';
		const html = processed.toString();
		const date = frontmatter.date ? new Date(frontmatter.date) : new Date();
		const tags = frontmatter.tags ?? [];
		const description =
			frontmatter.description ??
			(new JSDOM(html).window.document.body.textContent ?? '').slice(0, 140) + '[...]';
		const categories = frontmatter.categories ?? [];
		const priority = frontmatter.priority ?? 5;
		const postItem: App.Post = { html, title, date, description, tags, categories, priority, slug };
		slugMap.set(slug, postItem);
		for (const tag of tags) {
			if (!byTag[tag]) byTag[tag] = [] as App.Post[];
			byTag[tag].push(postItem);
		}

		for (const category of categories) {
			if (!byCategory[category]) byCategory[category] = [];
			byCategory[category].push(postItem);
		}

		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		if (!byDate[year]) byDate[year] = {};
		if (!byDate[year][month]) byDate[year][month] = [];
		byDate[year][month].push(postItem);

		result.push(postItem);
	}

	for (const tag in byTag) {
		byTag[tag].sort((a, b) => b.date.getDate() - a.date.getDate());
	}
	for (const category in byCategory) {
		byCategory[category].sort((a, b) => b.date.getDate() - a.date.getDate());
	}
	for (const year in byDate) {
		for (const month in byDate[+year]) {
			byDate[+year][+month].sort((a, b) => b.date.getDate() - a.date.getDate());
		}
	}

	sortedByDate = [];
	for (const year of Object.keys(byDate).sort((a, b) => +b - +a)) {
		const months: SortedPostsTimelineItem['months'] = [];
		for (const month of Object.keys(byDate[+year]).sort((a, b) => +b - +a)) {
			months.push({
				month: +month,
				posts: byDate[+year][+month]
			});
		}
		sortedByDate.push({
			year: +year,
			months
		});
	}

	result.sort((a, b) => {
		if (a.priority !== b.priority) {
			return b.priority - a.priority;
		}
		return b.date.getDate() - a.date.getDate();
	});

	for (let i = 0; i < result.length; i += PER_PAGE) {
		paginatedPosts.push(result.slice(i, i + PER_PAGE));
	}

	posts = result;
	isCached = true;

	return { posts, byTag, byCategory, byDate, paginatedPosts, sortedByDate, slugMap };
}
