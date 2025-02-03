import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Inter Variable', 'Helvetica', 'Arial', 'sans-serif']
		},
		extend: {}
	},

	plugins: [forms]
} satisfies Config;
