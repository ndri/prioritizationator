<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import SmIcon from './heroicons/micro/ArrowTopRightOnSquareIcon.svelte';
	import MdIcon from './heroicons/mini/ArrowTopRightOnSquareIcon.svelte';
	import LgIcon from './heroicons/outline/ArrowTopRightOnSquareIcon.svelte';

	interface Props {
		children: Snippet;
		href: string;
		class?: ClassValue;
		newTab?: boolean;
		iconSize?: 'sm' | 'md' | 'lg';
		plain?: boolean;
	}

	const {
		children,
		href,
		class: className,
		newTab = false,
		iconSize = 'md',
		plain = false
	}: Props = $props();
</script>

<a
	{href}
	class={[
		'inline-flex items-center',
		!plain && 'underline',
		!plain && 'text-accent-600 hover:text-accent-700',
		!plain && 'dark:text-accent-400 dark:hover:text-accent-300',
		iconSize === 'sm' && 'gap-0.5',
		iconSize === 'md' && 'gap-1',
		iconSize === 'lg' && 'gap-1',
		className
	]}
	target={newTab ? '_blank' : undefined}
	rel={newTab ? 'noopener noreferrer' : undefined}
>
	{@render children()}
	{#if newTab}
		{#if iconSize === 'md'}
			<MdIcon />
		{:else if iconSize === 'lg'}
			<LgIcon />
		{:else if iconSize === 'sm'}
			<SmIcon />
		{/if}
	{/if}
</a>
