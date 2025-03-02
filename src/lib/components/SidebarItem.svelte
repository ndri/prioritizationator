<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		text: string;
		icon: Snippet;
		active: boolean;
	}

	const { href, text, icon, active }: Props = $props();
</script>

<a
	{href}
	class={[
		'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold',
		active ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600',
		'hover:bg-indigo-100 hover:text-indigo-800',
		active ? 'dark:bg-slate-800 dark:text-indigo-400' : 'dark:text-slate-400',
		'dark:hover:bg-slate-800 dark:hover:text-indigo-400'
	]}
>
	{@render icon()}
	{text}
</a>
