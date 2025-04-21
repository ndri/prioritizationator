<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject, recordValueMatchupDraw, recordValueMatchupWin } from '$lib/db';
	import type { PageProps } from './$types';
	import TaskPairing from '$lib/components/TaskPairing.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import {
		filterIncompleteTasks,
		minTasksForRating,
		ratingsRequired,
		tasksReadyForRating,
		valueRatingsProgress
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
	<h1 class="sr-only text-3xl font-bold">{project.name} value rating</h1>

	{#if tasksReadyForRating(project.tasks)}
		{@const incompleteTasks = filterIncompleteTasks(project.tasks)}

		<h2 class="text-center text-2xl font-medium">
			Which of these provides <span class="text-accent-600 dark:text-accent-500">more value</span>
			in your project?
		</h2>

		<TaskPairing
			{projectId}
			dimension="value"
			recordWin={recordValueMatchupWin}
			recordDraw={recordValueMatchupDraw}
		/>

		<ProgressBar
			progress={valueRatingsProgress(incompleteTasks)}
			total={ratingsRequired(incompleteTasks)}
		/>
	{:else}
		<p class="text-main-500 dark:text-main-400">
			You need at least {minTasksForRating} incomplete tasks to rate them.
		</p>
	{/if}
{/if}
