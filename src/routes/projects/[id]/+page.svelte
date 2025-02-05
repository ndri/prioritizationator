<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import NewTaskForm from '$lib/components/NewTaskForm.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getProject, resetRatings } from '$lib/db';
	import type { PageProps } from './$types';
	import {
		easeRatingsProgress,
		filterRatedTasks,
		ratingsRequired,
		valueRatingsProgress
	} from '$lib/utils';
	import PrioritizationMatrix from '$lib/components/PrioritizationMatrix.svelte';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<a href="/">Back to projects</a>

<h1 class="text-3xl font-bold">{project?.name}</h1>

{#if project?.tasks?.length}
	<div class="flex flex-col gap-2">
		<p class="text-xl font-medium">
			Value rated: {valueRatingsProgress(project.tasks)}/{ratingsRequired(project.tasks)}
		</p>
		<p class="text-xl font-medium">
			Ease rated: {easeRatingsProgress(project.tasks)}/{ratingsRequired(project.tasks)}
		</p>
		<div class="grid grid-cols-2 gap-2">
			<Button href={`/projects/${projectId}/value`} variant="secondary" size="xl">
				Rate value
			</Button>
			<Button href={`/projects/${projectId}/ease`} variant="secondary" size="xl">Rate ease</Button>
		</div>
		<!-- <Button onclick={() => resetRatings(projectId)} variant="secondary" size="sm">
			Reset ratings
		</Button> -->
	</div>
{/if}

{#if filterRatedTasks(project?.tasks ?? []).length === 0}
	<p class="text-left text-slate-500 dark:text-slate-400">No tasks yet. Add some to get started!</p>
{:else}
	<PrioritizationMatrix tasks={project?.tasks ?? []} />
{/if}

<TaskList tasks={project?.tasks} />
<NewTaskForm {projectId} />
