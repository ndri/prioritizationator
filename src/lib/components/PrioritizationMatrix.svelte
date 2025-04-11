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

<section class="relative w-full p-4 md:p-16">
	<div class="relative" style="height:{chartWidth}px" bind:this={chartRef}>
		<!-- Vertical halves separator with labels -->
		<div class="absolute left-1/2 top-0 h-full w-px bg-slate-300 dark:bg-slate-700"></div>
		<div class="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-slate-500">
			more
			<br />
			effort
		</div>
		<div class="absolute right-0 top-1/2 -translate-y-1/2 text-right text-sm text-slate-500">
			less
			<br />
			effort
		</div>

		<!-- Horizontal halves separator with labels -->
		<div class="absolute left-0 top-1/2 h-px w-full bg-slate-300 dark:bg-slate-700"></div>
		<div class="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-slate-500">
			more valuable
		</div>
		<div class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-slate-500">
			less valuable
		</div>

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
