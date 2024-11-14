import { getPost } from '$lib/post';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { eraseHtml } from '$lib';

export const entries: EntryGenerator = async () => {
	const posts = await getPost();

	return posts.paginatedPosts.map((_, i) => ({
		page: (i + 1).toString()
	}));
};

export const load = async ({ params }) => {
	const posts = await getPost();
	if (!posts.paginatedPosts[+params.page - 1]) error(404, 'Not Found');
	return {
		posts: posts.paginatedPosts[+params.page - 1].map(eraseHtml),
		page: +params.page,
		totalPages: posts.paginatedPosts.length
	};
};

export const prerender = true;
