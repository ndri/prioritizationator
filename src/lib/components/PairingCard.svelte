<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick: () => void;
		children?: Snippet;
	}

	const { onclick, children }: Props = $props();
</script>

<button
	class={[
		'flex min-h-40 cursor-pointer items-center justify-center',
		'rounded-xl p-8 text-xl font-semibold ring-1 ring-inset',
		'text-main-900 ring-main-300 bg-white',
		'hover:bg-main-100',
		'dark:bg-main-800 dark:text-white dark:ring-0',
		'dark:hover:bg-main-700',
		'focus-visible:outline-2 focus-visible:outline-offset-2',
		'focus-visible:outline-accent-600',
		'dark:focus-visible:outline-accent-500'
	]}
	{onclick}
>
	{@render children?.()}
</button>
