import { getPost } from '$lib/post';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
	const posts = await getPost();

	return Array.from(posts.slugMap.keys()).map((id) => ({ id }));
};

export const load = async ({ params }) => {
	const posts = await getPost();
	if (!posts.slugMap.has(params.id)) error(404, 'Not Found');
	const post = posts.slugMap.get(params.id);
	return post!;
};
