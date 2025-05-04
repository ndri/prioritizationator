<script lang="ts">
	import TaskList from '$lib/components/TaskList.svelte';
	import NewTaskForm from '$lib/components/NewTaskForm.svelte';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject } from '$lib/db';
	import Button from '$lib/components/ui/Button.svelte';
	import { minTasksForRating } from '$lib/utils/tasks';
	import { createTitle } from '$lib/utils/title';
	import type { PageProps } from './$types';
	import { CheckIcon } from '@sidekickicons/svelte/20/solid';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<svelte:head><title>{createTitle(project?.name)}</title></svelte:head>

<div class="mx-auto flex w-full max-w-2xl flex-col gap-8">
	{#if project}
		<div class="flex flex-col gap-4">
			<h2 class="text-2xl font-medium">
				Tasks for <span class="text-accent-600 dark:text-accent-500">{project.name}</span>
			</h2>
			<p class="text-sm">
				Brainstorm some next actions in your project that you want to prioritize.
			</p>
			<p class="text-sm">You can add as many as you want, and you can always add more later.</p>
		</div>

		{#if project.tasks}
			<NewTaskForm {projectId} autofocus />

			{#if project.tasks.length > 0}
				<TaskList tasks={project.tasks.toReversed()} />
			{/if}

			{#if project.tasks.length >= minTasksForRating}
				<div class="flex justify-end">
					<Button href="/projects/{projectId}/intro/2" size="lg" LeftIcon={CheckIcon}>
						Continue
					</Button>
				</div>
			{:else}
				{@const needToAdd = minTasksForRating - project.tasks.length}
				<p class="text-main-500 dark:text-main-400 text-sm">
					Add {needToAdd} more task{needToAdd === 1 ? '' : 's'} to get started!
				</p>
			{/if}
		{/if}
	{/if}
</div>
