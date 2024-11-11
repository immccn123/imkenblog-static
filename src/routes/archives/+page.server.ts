import { getPost } from "$lib/post";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        posts: await getPost()
    }
};