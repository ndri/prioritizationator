<script lang="ts">
	import type { Heroicon } from './heroicons/Heroicon';

	interface Props {
		href: string;
		text: string;
		Icon?: Heroicon;
		active: boolean;
	}

	const { href, text, Icon, active }: Props = $props();
</script>

<a
	{href}
	class={[
		'group flex max-w-48 items-center gap-3 truncate rounded-lg px-2.5 py-1.5 text-sm',
		active ? 'font-semibold' : 'font-medium',
		active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600',
		'hover:bg-indigo-50 hover:text-indigo-600',
		active ? 'dark:bg-slate-800 dark:text-indigo-400' : 'dark:text-slate-400',
		'dark:hover:bg-slate-800 dark:hover:text-indigo-400'
	]}
>
	{#if Icon}
		<Icon
			class={[
				'flex-shrink-0',
				active ? 'text-indigo-600' : 'text-slate-400',
				'group-hover:text-indigo-600',
				active ? 'dark:text-indigo-400' : 'dark:text-slate-600',
				'dark:group-hover:text-indigo-400'
			]}
		/>
	{/if}
	<span class="truncate">{text}</span>
</a>
