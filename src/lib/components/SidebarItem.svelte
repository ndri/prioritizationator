<script lang="ts">
	import type { Heroicon } from './heroicons/Heroicon';

	interface Props {
		href: string;
		text: string;
		Icon?: Heroicon;
		active: boolean;
		onclick?: () => void;
	}

	const { href, text, Icon, active, onclick }: Props = $props();
</script>

<a
	{href}
	class={[
		'group flex items-center gap-3 truncate rounded-lg px-2.5 py-1.5 text-sm',
		active ? 'font-semibold' : 'font-medium',
		active ? 'bg-accent-50 text-accent-600' : 'text-main-600',
		'hover:bg-accent-50 hover:text-accent-600',
		active ? 'dark:text-accent-400 dark:bg-main-800' : 'dark:text-main-400',
		'dark:hover:text-accent-400 dark:hover:bg-main-800'
	]}
	{onclick}
>
	{#if Icon}
		<Icon
			class={[
				'shrink-0',
				active ? 'text-accent-600' : 'text-main-400',
				'group-hover:text-accent-600',
				active ? 'dark:text-accent-400' : 'dark:text-main-600',
				'dark:group-hover:text-accent-400'
			]}
		/>
	{/if}
	<span class="truncate">{text}</span>
</a>
