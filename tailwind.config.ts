import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Inter Variable', 'Helvetica', 'Arial', 'sans-serif']
		},
		extend: {}
	},

	plugins: []
} satisfies Config;
