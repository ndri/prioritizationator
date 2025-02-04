<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject, recordLoss, recordTie, recordWin } from '$lib/db';
	import type { PageProps } from './$types';
	import TaskPairing from '$lib/components/TaskPairing.svelte';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<a href="/projects/{projectId}">Back to project</a>

<h1 class="text-3xl font-bold">{project?.name} value rating</h1>

<h2 class="text-lg font-medium">Which of these is more valuable?</h2>

<TaskPairing {projectId} {recordWin} {recordLoss} {recordTie} />
