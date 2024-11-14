import { getPost } from '$lib/post';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
	const posts = await getPost();
	return Object.keys(posts.byTag).map(tag => ({tag}));
};

export const load = async ({ params }) => {
	const posts = await getPost();
	if (!posts.byTag[params.tag]) error(404, 'Not Found');
	return posts.byTag[params.tag];
};

export const prerender = true;
