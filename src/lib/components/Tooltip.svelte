<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		text: string;
		class?: ClassValue;
		children: Snippet;
		[key: string]: any;
	}

	const { text, children, class: className, ...props }: Props = $props();

	let showingTooltip = $state(false);

	const showTooltip = () => {
		showingTooltip = true;
	};

	const hideTooltip = () => {
		showingTooltip = false;
	};
</script>

<div
	role="tooltip"
	class={[className]}
	onmouseenter={showTooltip}
	onfocus={showTooltip}
	onmouseleave={hideTooltip}
	onfocusout={hideTooltip}
	{...props}
>
	{@render children()}
	<div
		class={[
			'absolute bottom-full left-1/2 z-10 w-max max-w-xs -translate-x-1/2 -translate-y-1 rounded-lg px-2.5 py-1.5 text-center text-xs font-medium',
			'bg-main-700 dark:bg-main-950 dark:border-main-800 text-white dark:border',
			!showingTooltip && 'sr-only'
		]}
	>
		{text}
	</div>
</div>
