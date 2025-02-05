<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick: () => void;
		children?: Snippet;
	}

	const { onclick, children }: Props = $props();
</script>

<button
	class="flex items-center justify-center rounded-xl bg-white p-8 text-2xl font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-800 dark:text-white dark:ring-0 dark:hover:bg-slate-700 dark:focus-visible:outline-indigo-500"
	{onclick}
>
	{@render children?.()}
</button>
