import { glob } from 'glob';

async function getPost() {
	const globs = await glob('../posts/*.md');

	for (const filename in globs) {
		const module = await import(filename);
	}
}
