<script lang="ts">
	import { ChevronDownIcon, ChevronUpIcon } from '@sidekickicons/svelte/24/outline';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		question: string;
		children: Snippet;
	}

	const { question, children }: Props = $props();

	let show = $state(false);
</script>

<div class="flex flex-col py-2">
	<button
		class={[
			'-mx-3 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left',
			'hover:bg-main-100 dark:hover:bg-main-900'
		]}
		onclick={() => (show = !show)}
	>
		<span class="text-lg">{question}</span>
		{#if show}
			<ChevronUpIcon class="text-main-500 h-5 w-5" />
		{:else}
			<ChevronDownIcon class="text-main-500 h-5 w-5" />
		{/if}
	</button>
	{#if show}
		<div class="text-main-500 dark:text-main-400 -mx-3 flex flex-col gap-3 p-3" transition:slide>
			{@render children()}
		</div>
	{/if}
</div>
