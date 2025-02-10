<script lang="ts">
	import type { Task } from '$lib/db';
	import { taskColorClasses } from '$lib/utils/tasks';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		tasks: Task[];
	}

	const { tasks }: Props = $props();

	let chartRef = $state<HTMLDivElement>();
	let chartWidth = $derived(chartRef?.clientWidth ?? 0);
</script>

<section class="relative w-full p-16">
	<!-- Value label -->
	<div
		class="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-slate-700 dark:text-slate-300"
	>
		Value
	</div>
	<!-- Ease label -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-700 dark:text-slate-300">
		Ease
	</div>
	<!-- Numbers -->
	<div class="absolute bottom-10 left-10 text-slate-500 dark:text-slate-500">0</div>
	<div class="absolute bottom-10 right-10 text-slate-500 dark:text-slate-500">100</div>
	<div class="absolute left-8 top-14 text-slate-500 dark:text-slate-500">100</div>

	<div class="relative" style="height:{chartWidth}px" bind:this={chartRef}>
		<!-- Vertical halves separator -->
		<div class="absolute left-1/2 top-0 h-full w-px bg-slate-300 dark:bg-slate-700"></div>
		<!-- Horizontal halves separator -->
		<div class="absolute left-0 top-1/2 h-px w-full bg-slate-300 dark:bg-slate-700"></div>
		<!-- Bottom axis -->
		<div class="absolute bottom-0 left-0 h-[2px] w-full bg-slate-500 dark:bg-slate-500"></div>
		<!-- Left axis -->
		<div class="absolute left-0 top-0 h-full w-[2px] bg-slate-500 dark:bg-slate-500"></div>
		<!-- Top right quadrant -->
		<div
			class="absolute right-0 top-0 flex h-1/2 w-1/2 items-start justify-end p-4 text-right font-medium text-slate-500"
		>
			Low Hanging Fruits
		</div>
		<!-- Bottom right quadrant -->
		<div
			class="absolute bottom-0 right-0 flex h-1/2 w-1/2 items-end justify-end p-4 text-right text-slate-500"
		>
			Quick Wins
		</div>
		<!-- Top left quadrant -->
		<div
			class="absolute left-0 top-0 flex h-1/2 w-1/2 items-start justify-start p-4 text-slate-500"
		>
			Leaps
		</div>
		<!-- Bottom left quadrant -->
		<div
			class="absolute bottom-0 left-0 flex h-1/2 w-1/2 items-end justify-start p-4 text-slate-500"
		>
			Traps
		</div>

		<!-- Tasks -->
		{#each tasks as task}
			{@const bubbleSize = 20}
			{@const topPosition = `calc(${100 - (task.valueScore ?? 0)}% - ${bubbleSize / 2}px)`}
			{@const leftPosition = `calc(${task.easeScore ?? 0}% - ${bubbleSize / 2}px)`}
			{@const style = `top:${topPosition}; left:${leftPosition}`}
			{@const bubbleStyle = `width:${bubbleSize}px; height:${bubbleSize}px`}
			{@const bubbleColor = taskColorClasses(task)}
			<Tooltip text={task.name} class="absolute rounded-full" {style}>
				<div class={['cursor-pointer rounded-full', bubbleColor]} style={bubbleStyle}></div>
			</Tooltip>
		{/each}
	</div>
</section>
