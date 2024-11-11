import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

import type { PluginOption } from 'vite';

function PostHotReload(): PluginOption {
	return {
		name: 'post-hot-reload',
		enforce: 'post',
		handleHotUpdate({ file, server }) {
			if (file.match(/posts\/(.*).md$/)) {
				server.ws.send({
					type: 'full-reload'
				});
			}
		}
	};
}

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte'
		}),
		PostHotReload()
	]
});
