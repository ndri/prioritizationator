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
			'bg-slate-700 text-white dark:border dark:border-slate-800 dark:bg-slate-950',
			!showingTooltip && 'sr-only'
		]}
	>
		{text}
	</div>
</div>
