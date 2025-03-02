<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject, recordValueLoss, recordValueTie, recordValueWin } from '$lib/db';
	import type { PageProps } from './$types';
	import TaskPairing from '$lib/components/TaskPairing.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { ratingsRequired, valueRatingsProgress } from '$lib/utils/tasks';
	import BackLink from '$lib/components/BackLink.svelte';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<BackLink href="/projects/{projectId}" text="Back to project" />

<h1 class="sr-only text-3xl font-bold">{project?.name} value rating</h1>

<h2 class="text-center text-2xl font-medium">
	Which of these provides <span class="text-indigo-600 dark:text-indigo-500">more value</span>
	in your project?
</h2>

<TaskPairing
	{projectId}
	dimension="value"
	recordWin={recordValueWin}
	recordLoss={recordValueLoss}
	recordTie={recordValueTie}
/>

<div>{valueRatingsProgress(project?.tasks ?? [])}/{ratingsRequired(project?.tasks ?? [])}</div>
<ProgressBar
	progress={valueRatingsProgress(project?.tasks ?? [])}
	total={ratingsRequired(project?.tasks ?? [])}
/>
