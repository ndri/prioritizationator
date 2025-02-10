<script lang="ts">
	import TaskList from '$lib/components/TaskList.svelte';
	import NewTaskForm from '$lib/components/NewTaskForm.svelte';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject } from '$lib/db';
	import type { PageProps } from './$types';
	import Button from '$lib/components/ui/Button.svelte';

	const MIN_TASKS = 5;

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

{#if project}
	<h1 class="text-2xl font-medium">
		Tasks for <span class="text-indigo-600 dark:text-indigo-500">{project.name}</span>
	</h1>

	{#if project.tasks}
		{#if project.tasks.length > 0}
			<TaskList tasks={project.tasks} />
		{/if}

		<NewTaskForm {projectId} />

		{#if project.tasks.length >= MIN_TASKS}
			<Button href="/projects/{projectId}" size="xl">Continue</Button>
		{:else}
			<p class="text-slate-500 dark:text-slate-400">
				Add {MIN_TASKS - project.tasks.length} more tasks to get started!
			</p>
		{/if}
	{/if}
{/if}
