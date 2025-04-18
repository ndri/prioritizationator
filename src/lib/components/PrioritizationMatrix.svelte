<script lang="ts">
	import type { Task } from '$lib/db';
	import { taskColorClasses } from '$lib/utils/tasks';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		tasks: Task[];
	}

	const { tasks }: Props = $props();

	let chartRef = $state<HTMLDivElement>();
	let chartWidth = $state<number>(0);

	$effect(() => {
		chartWidth = chartRef?.clientWidth ?? 0;

		const resizeObserver = new ResizeObserver((entries) => {
			chartWidth = entries[0].contentRect.width;
		});
		if (chartRef) {
			resizeObserver.observe(chartRef);
		}
		return () => resizeObserver.disconnect();
	});
</script>

<section class="relative w-full p-4 @xl:p-16">
	<div class="relative" style="height:{chartWidth}px" bind:this={chartRef}>
		<!-- Vertical halves separator with labels -->
		<div class="bg-main-300 dark:bg-main-700 absolute top-0 left-1/2 h-full w-px"></div>
		<div class="text-main-500 absolute top-1/2 left-0 -translate-y-1/2 text-sm">
			less
			<br />
			easier
		</div>
		<div class="text-main-500 absolute top-1/2 right-0 -translate-y-1/2 text-right text-sm">
			more
			<br />
			easier
		</div>

		<!-- Horizontal halves separator with labels -->
		<div class="bg-main-300 dark:bg-main-700 absolute top-1/2 left-0 h-px w-full"></div>
		<div class="text-main-500 absolute -top-6 left-1/2 -translate-x-1/2 text-sm">more valuable</div>
		<div class="text-main-500 absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm">
			less valuable
		</div>

		<!-- Top right quadrant -->
		<div
			class="text-main-500 absolute top-0 right-0 flex h-1/2 w-1/2 items-start justify-end p-4 text-right font-medium"
		>
			Low Hanging Fruits
		</div>
		<!-- Bottom right quadrant -->
		<div
			class="text-main-500 absolute right-0 bottom-0 flex h-1/2 w-1/2 items-end justify-end p-4 text-right"
		>
			Quick Wins
		</div>
		<!-- Top left quadrant -->
		<div class="text-main-500 absolute top-0 left-0 flex h-1/2 w-1/2 items-start justify-start p-4">
			Leaps
		</div>
		<!-- Bottom left quadrant -->
		<div
			class="text-main-500 absolute bottom-0 left-0 flex h-1/2 w-1/2 items-end justify-start p-4"
		>
			Traps
		</div>

		<!-- Tasks -->
		{#each tasks as task}
			{@const bubbleSize = 20}
			{@const topPosition = `calc(${100 - (task.valueRating ?? 0)}% - ${bubbleSize / 2}px)`}
			{@const leftPosition = `calc(${task.easeRating ?? 0}% - ${bubbleSize / 2}px)`}
			{@const style = `top:${topPosition}; left:${leftPosition}`}
			{@const bubbleStyle = `width:${bubbleSize}px; height:${bubbleSize}px`}
			{@const bubbleColor = taskColorClasses(task)}
			<Tooltip text={task.name} class="absolute rounded-full" {style}>
				<div class={['cursor-pointer rounded-full', bubbleColor]} style={bubbleStyle}></div>
			</Tooltip>
		{/each}
	</div>
</section>
