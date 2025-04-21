<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject, recordEaseMatchupDraw, recordEaseMatchupWin } from '$lib/db';
	import type { PageProps } from './$types';
	import TaskPairing from '$lib/components/TaskPairing.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import {
		easeRatingsProgress,
		filterIncompleteTasks,
		minTasksForRating,
		ratingsRequired,
		tasksReadyForRating
	} from '$lib/utils/tasks';
	import BackLink from '$lib/components/BackLink.svelte';
	import { createTitle } from '$lib/utils/title';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<svelte:head><title>{createTitle(project?.name)}</title></svelte:head>

<BackLink href="/projects/{projectId}" text="Back to project" />

{#if project}
	<h1 class="sr-only text-3xl font-bold">{project.name} ease rating</h1>

	{#if tasksReadyForRating(project.tasks)}
		{@const incompleteTasks = filterIncompleteTasks(project.tasks)}

		<div class="flex flex-col gap-3">
			<h2 class="text-center text-xl font-medium">
				Which task requires <span class="text-accent-600 dark:text-accent-500">less effort</span>
				to complete?
			</h2>
			<p class="text-main-500 dark:text-main-400 text-center text-sm">
				Think about the time, energy, and resources required.
			</p>
		</div>

		<ProgressBar
			progress={easeRatingsProgress(incompleteTasks)}
			total={ratingsRequired(incompleteTasks)}
		/>

		<TaskPairing
			{projectId}
			dimension="ease"
			recordWin={recordEaseMatchupWin}
			recordDraw={recordEaseMatchupDraw}
		/>
	{:else}
		<p class="text-main-500 dark:text-main-400">
			You need at least {minTasksForRating} incomplete tasks to rate them.
		</p>
	{/if}
{/if}
