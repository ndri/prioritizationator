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

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<BackLink href="/projects/{projectId}" text="Back to project" />

{#if project}
	<h1 class="sr-only text-3xl font-bold">{project.name} ease rating</h1>

	{#if tasksReadyForRating(project.tasks)}
		{@const incompleteTasks = filterIncompleteTasks(project.tasks)}

		<h2 class="text-center text-2xl font-medium">
			Which of these requires <span class="text-indigo-600 dark:text-indigo-500">less effort</span>
			to complete?
		</h2>

		<TaskPairing
			{projectId}
			dimension="ease"
			recordWin={recordEaseMatchupWin}
			recordDraw={recordEaseMatchupDraw}
		/>

		<ProgressBar
			progress={easeRatingsProgress(incompleteTasks)}
			total={ratingsRequired(incompleteTasks)}
		/>
	{:else}
		<p class="text-slate-500 dark:text-slate-400">
			You need at least {minTasksForRating} incomplete tasks to rate them.
		</p>
	{/if}
{/if}
