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
		'flex cursor-pointer items-center justify-center',
		'rounded-xl p-8 text-2xl font-semibold ring-1 ring-inset',
		'bg-white text-slate-900 ring-slate-300',
		'hover:bg-slate-100',
		'dark:bg-slate-800 dark:text-white dark:ring-0',
		'dark:hover:bg-slate-700',
		'focus-visible:outline focus-visible:outline-offset-2',
		'focus-visible:outline-indigo-600',
		'dark:focus-visible:outline-indigo-500'
	]}
	{onclick}
>
	{@render children?.()}
</button>
