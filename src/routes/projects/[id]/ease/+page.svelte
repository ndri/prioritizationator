<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject, recordEaseLoss, recordEaseTie, recordEaseWin } from '$lib/db';
	import type { PageProps } from './$types';
	import TaskPairing from '$lib/components/TaskPairing.svelte';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<a href="/projects/{projectId}">Back to project</a>

<h1 class="text-3xl font-bold">{project?.name} ease rating</h1>

<h2 class="text-lg font-medium">Which of these requires less effort to complete?</h2>

<TaskPairing
	{projectId}
	dimension="ease"
	recordWin={recordEaseWin}
	recordLoss={recordEaseLoss}
	recordTie={recordEaseTie}
/>
