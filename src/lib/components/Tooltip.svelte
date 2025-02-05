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
	{#if showingTooltip}
		<div
			class="absolute bottom-full left-1/2 z-10 -translate-x-1/2 -translate-y-1 transform whitespace-nowrap rounded-lg bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-white dark:bg-slate-950"
		>
			{text}
		</div>
	{/if}
</div>
