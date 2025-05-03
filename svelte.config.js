import { vitePreprocess } from "@astrojs/svelte";

import icons from "unplugin-icons/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
}

export default config
