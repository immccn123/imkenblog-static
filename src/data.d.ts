declare module "https://data.imken.moe/links.js" {
	export interface Site {
		readonly name: string;
		readonly url: string;
		readonly description: string;
		/** URL to the website's avatar/image */
		readonly avatar: string;
	}

	/**
	 * Array of curated website links
	 *
	 * @example
	 * import links from 'https://data.imken.moe/links.js';
	 *
	 * console.log(links[0].name); // "Example Site"
	 */
	const links: readonly Site[];

	export default links;
}
