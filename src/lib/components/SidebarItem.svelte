<script lang="ts">
	import type { Heroicon } from '$lib/Heroicon';
	import { ArrowTopRightOnSquareIcon } from '@sidekickicons/svelte/20/solid';

	interface Props {
		href: string;
		text: string;
		Icon?: Heroicon;
		active: boolean;
		newTab?: boolean;
		onclick?: () => void;
	}

	const { href, text, Icon, active, onclick, newTab = false }: Props = $props();

	const iconClasses = [
		'shrink-0',
		active ? 'text-accent-600' : 'text-main-400',
		'group-hover:text-accent-600',
		active ? 'dark:text-accent-400' : 'dark:text-main-600',
		'dark:group-hover:text-accent-400'
	];
</script>

<a
	{href}
	class={[
		'group flex items-center gap-3 truncate rounded-lg px-2.5 py-1.5 text-sm',
		active ? 'font-semibold' : 'font-medium',
		active ? 'bg-accent-50 text-accent-600' : 'text-main-600',
		'hover:bg-accent-50 hover:text-accent-600',
		active ? 'dark:text-accent-400 dark:bg-main-800' : 'dark:text-main-400',
		'dark:hover:text-accent-400 dark:hover:bg-main-800',
		'focus-outline'
	]}
	{onclick}
	target={newTab ? '_blank' : undefined}
	rel={newTab ? 'noopener noreferrer' : undefined}
>
	{#if Icon}
		<Icon class={iconClasses} />
	{/if}
	<span class="grow truncate">{text}</span>
	{#if newTab}
		<ArrowTopRightOnSquareIcon class={iconClasses} />
	{/if}
</a>
