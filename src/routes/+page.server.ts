import { getPost } from "$lib/post"

export const load = async () => {
    const posts = await getPost()
    return {
        posts: posts.paginatedPosts[0],
        page: 1,
        totalPages: posts.paginatedPosts.length
    }
}