// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import 'unplugin-icons/types/svelte';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Post {
			title: string;
			headerImage?: string;
			date: Date;

			categories: string[];
			tags: string[];

			description: string;
			html?: string;

			priority: number;
			slug: string;
		}
	}

	declare module '*.md' {
		import type { SvelteComponent } from 'svelte';

		export default class Comp extends SvelteComponent {}

		export const metadata: Record<string, unknown>;
	}

	declare module 'https://data.imken.moe/links.js' {
		export default [];
	}
}

export {};
