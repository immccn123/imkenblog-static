import { getPost } from '$lib/post';
import { error } from 'console';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
	const posts = await getPost();

	return Array.from(posts.slugMap.keys()).map((id) => ({ id }));
};

export const load = async ({ params }) => {
	const posts = await getPost();
	const post = posts.slugMap.get(params.id);
	if (post === undefined) error(404, 'Not Found');
	return post!;
};
