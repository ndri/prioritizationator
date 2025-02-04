<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import NewTaskForm from '$lib/components/NewTaskForm.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getProject, resetRatings } from '$lib/db';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<a href="/">Back to projects</a>

<h1 class="text-3xl font-bold">{project?.name}</h1>

<div class="grid grid-cols-2 gap-2">
	<Button href={`/projects/${projectId}/value`} variant="secondary" size="xl">Rate value</Button>
	<Button href={`/projects/${projectId}/ease`} variant="secondary" size="xl">Rate ease</Button>
</div>

<Button onclick={() => resetRatings(projectId)} variant="secondary" size="xl">Reset ratings</Button>

<TaskList tasks={project?.tasks} />
<NewTaskForm {projectId} />
