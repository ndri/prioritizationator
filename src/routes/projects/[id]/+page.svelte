<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import NewTaskForm from '../../../components/NewTaskForm.svelte';
	import TaskList from '../../../components/TaskList.svelte';
	import Button from '../../../components/ui/Button.svelte';
	import { getProject } from '../../../db';
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
	<Button href={`/projects/${projectId}/effort`} variant="secondary" size="xl">Rate effort</Button>
</div>

<TaskList tasks={project?.tasks} />
<NewTaskForm {projectId} />
