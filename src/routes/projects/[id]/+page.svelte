<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import NewTaskForm from '../../../components/NewTaskForm.svelte';
	import TaskList from '../../../components/TaskList.svelte';
	import { db, getProject } from '../../../db';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<a href="/">Back to projects</a>

<h1 class="text-3xl font-bold">{project?.name}</h1>

<TaskList tasks={project?.tasks} />
<NewTaskForm {projectId} />
