import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export async function getTagsMap(): Promise<
	Record<string, CollectionEntry<"blog">[]>
> {
	const posts = await getCollection("blog");
	const map: Record<string, CollectionEntry<"blog">[]> = {};

	for (const post of posts) {
		for (const tag of post.data.tags ?? []) {
			if (!map[tag]) map[tag] = [];
			map[tag].push(post);
		}
	}

	return map;
}

export async function getCategoriesMap(): Promise<
	Record<string, CollectionEntry<"blog">[]>
> {
	const posts = await getCollection("blog");
	const map: Record<string, CollectionEntry<"blog">[]> = {};

	for (const post of posts) {
		for (const category of post.data.categories ?? []) {
			if (!map[category]) map[category] = [];
			map[category].push(post);
		}
	}

	return map;
}

export async function getSeriesMap(): Promise<
	Record<
		string,
		{
			posts: CollectionEntry<"blog">[];
			name?: string;
			description?: string;
		}
	>
> {
	const posts = await getCollection("blog");
	// [slug, { ... }]
	const map: Record<
		string,
		{
			posts: CollectionEntry<"blog">[];
			name?: string;
			description?: string;
		}
	> = {};

	for (const post of posts) {
		if (post.data.series) {
			const { slug, name, description } = post.data.series;
			if (!map[slug]) map[slug] = { posts: [] };
			map[slug].posts.push(post);
			if (name) map[slug].name = name;
			if (description) map[slug].description = description;
		}
	}

	// sort by [order, date]
	for (const series of Object.values(map)) {
		series.posts.sort((a, b) => {
			const orderDiff = a.data.series!.order - b.data.series!.order;
			if (orderDiff !== 0) return orderDiff;
			return (
				new Date(b.data.date).getTime() -
				new Date(a.data.date).getTime()
			);
		});
	}

	return map;
}

export interface TimelineMonth {
	month: number;
	posts: CollectionEntry<"blog">[];
}

export interface TimelineYear {
	year: number;
	months: TimelineMonth[];
}

export async function getTimeline(): Promise<TimelineYear[]> {
	const posts = await getCollection("blog");

	const byDate: Record<
		number,
		Record<number, CollectionEntry<"blog">[]>
	> = {};

	for (const post of posts) {
		const date = new Date(post.data.date);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;

		byDate[year] ??= {};
		byDate[year][month] ??= [];
		byDate[year][month].push(post);
	}

	return Object.keys(byDate)
		.map(Number)
		.sort((a, b) => b - a)
		.map((year) => ({
			year,
			months: Object.keys(byDate[year])
				.map(Number)
				.sort((a, b) => b - a)
				.map((month) => ({
					month,
					posts: byDate[year][month].sort(sortPosts),
				})),
		}));
}

export async function getPaginatedPosts(
	perPage = 10
): Promise<CollectionEntry<"blog">[][]> {
	const posts = (await getCollection("blog")).sort(sortPosts);

	const result: CollectionEntry<"blog">[][] = [];
	for (let i = 0; i < posts.length; i += perPage) {
		result.push(posts.slice(i, i + perPage));
	}
	return result;
}

export function sortPosts(
	a: CollectionEntry<"blog">,
	b: CollectionEntry<"blog">
): number {
	const priorityDiff = (b.data.priority ?? 0) - (a.data.priority ?? 0);
	if (priorityDiff !== 0) return priorityDiff;

	return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
}

export async function getAllTags(): Promise<string[]> {
	const posts = await getCollection("blog");
	const tags = new Set<string>();

	for (const post of posts) {
		for (const tag of post.data.tags ?? []) {
			tags.add(tag);
		}
	}

	return Array.from(tags).sort();
}

export async function getAllCategories(): Promise<string[]> {
	const posts = await getCollection("blog");
	const categories = new Set<string>();

	for (const post of posts) {
		for (const category of post.data.categories ?? []) {
			categories.add(category);
		}
	}

	return Array.from(categories).sort();
}

export async function getRecentPosts(limit: number) {
	const posts = await getCollection("blog");
	const sorted = posts
		.filter((post) => post.data.draft !== true)
		.sort(
			(a, b) =>
				new Date(b.data.date).getTime() -
				new Date(a.data.date).getTime()
		);

	return sorted.slice(0, limit).map((post) => ({
		title: post.data.title,
		url: `/archives/${post.id}`,
	}));
}
