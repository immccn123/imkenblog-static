import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				link: '#c9717e',
				base: '#666',
				impink: '#c9717e'
			},
			fontSize: {
				sm: '0.8em',
				base: '0.9em'
			}
		}
	},

	plugins: [typography, forms, aspectRatio]
} satisfies Config;
