<script lang="ts">
	import TaskList from '$lib/components/TaskList.svelte';
	import NewTaskForm from '$lib/components/NewTaskForm.svelte';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject } from '$lib/db';
	import type { PageProps } from './$types';
	import Button from '$lib/components/ui/Button.svelte';
	import { minTasksForRating } from '$lib/utils/tasks';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

{#if project}
	<h1 class="text-2xl font-medium">
		Tasks for <span class="text-accent-600 dark:text-accent-500">{project.name}</span>
	</h1>

	{#if project.tasks}
		{#if project.tasks.length > 0}
			<TaskList tasks={project.tasks} />
		{/if}

		<NewTaskForm {projectId} autofocus />

		{#if project.tasks.length >= minTasksForRating}
			<Button href="/projects/{projectId}" size="xl">Continue</Button>
		{:else}
			{@const needToAdd = minTasksForRating - project.tasks.length}
			<p class="text-main-500 dark:text-main-400">
				Add {needToAdd} more task{needToAdd === 1 ? '' : 's'} to get started!
			</p>
		{/if}
	{/if}
{/if}
