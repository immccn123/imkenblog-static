import { eraseHtml } from '$lib';
import { getPost } from '$lib/post';

export const load = async () => {
	const posts = await getPost();
	return {
		posts: posts.paginatedPosts[0].map(eraseHtml),
		page: 1,
		totalPages: posts.paginatedPosts.length
	};
};
