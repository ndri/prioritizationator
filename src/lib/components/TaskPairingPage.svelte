<script lang="ts">
	import {
		getProject,
		recordEaseMatchupDraw,
		recordEaseMatchupWin,
		recordValueMatchupDraw,
		recordValueMatchupWin
	} from '$lib/db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import {
		easeRatingsProgress,
		filterIncompleteTasks,
		minTasksForRating,
		ratingsRequired,
		tasksReadyForRating,
		valueRatingsProgress
	} from '$lib/utils/tasks';
	import { createTitle } from '$lib/utils/title';
	import ProgressBar from './ProgressBar.svelte';
	import TaskPairing from './TaskPairing.svelte';

	interface Props {
		projectId: number;
		dimension: 'value' | 'ease';
	}

	const { projectId, dimension }: Props = $props();

	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<svelte:head><title>{createTitle(project?.name)}</title></svelte:head>

{#if project}
	<h1 class="sr-only text-3xl font-bold">{project.name} value rating</h1>

	{#if tasksReadyForRating(project.tasks)}
		{@const incompleteTasks = filterIncompleteTasks(project.tasks)}
		{@const progress =
			dimension === 'value'
				? valueRatingsProgress(incompleteTasks)
				: easeRatingsProgress(incompleteTasks)}
		{@const total = ratingsRequired(incompleteTasks)}

		<div class="flex flex-col gap-3">
			<h2 class="text-center text-xl font-medium">
				{#if dimension === 'value'}
					Which task provides <span class="text-accent-600 dark:text-accent-500">more value</span>
					in your project?
				{:else if dimension === 'ease'}
					Which task requires <span class="text-accent-600 dark:text-accent-500">less effort</span>
					to complete?
				{/if}
			</h2>

			<p class="text-main-500 dark:text-main-400 text-center text-sm">
				{#if dimension === 'value'}
					Think about how much do they contribute to the main goal of your project.
				{:else if dimension === 'ease'}
					Think about the time, energy, and resources required.
				{/if}
			</p>
		</div>

		<TaskPairing
			{projectId}
			{dimension}
			recordWin={dimension === 'value' ? recordValueMatchupWin : recordEaseMatchupWin}
			recordDraw={dimension === 'value' ? recordValueMatchupDraw : recordEaseMatchupDraw}
		/>

		<ProgressBar {progress} {total} />
	{:else}
		<p class="text-main-500 dark:text-main-400">
			You need at least {minTasksForRating} incomplete tasks to rate them.
		</p>
	{/if}
{/if}
