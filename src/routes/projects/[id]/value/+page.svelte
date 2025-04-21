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

		<div class="flex flex-col gap-3">
			<h2 class="text-center text-xl font-medium">
				Which task provides <span class="text-accent-600 dark:text-accent-500">more value</span>
				in your project?
			</h2>

			<p class="text-main-500 dark:text-main-400 text-center text-sm">
				Think about how much do they contribute to the main goal of your project.
			</p>
		</div>

		<ProgressBar
			progress={valueRatingsProgress(incompleteTasks)}
			total={ratingsRequired(incompleteTasks)}
		/>

		<TaskPairing
			{projectId}
			dimension="value"
			recordWin={recordValueMatchupWin}
			recordDraw={recordValueMatchupDraw}
		/>
	{:else}
		<p class="text-main-500 dark:text-main-400">
			You need at least {minTasksForRating} incomplete tasks to rate them.
		</p>
	{/if}
{/if}
