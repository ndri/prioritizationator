<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getProject, recordEaseLoss, recordEaseTie, recordEaseWin } from '$lib/db';
	import type { PageProps } from './$types';
	import TaskPairing from '$lib/components/TaskPairing.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { easeRatingsProgress, ratingsRequired } from '$lib/utils/tasks';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<h1 class="sr-only text-3xl font-bold">{project?.name} ease rating</h1>

<h2 class="text-center text-2xl font-medium">
	Which of these requires <span class="text-indigo-600 dark:text-indigo-500">less effort</span>
	 to complete?
</h2>

<TaskPairing
	{projectId}
	dimension="ease"
	recordWin={recordEaseWin}
	recordLoss={recordEaseLoss}
	recordTie={recordEaseTie}
/>

<ProgressBar
	progress={easeRatingsProgress(project?.tasks ?? [])}
	total={ratingsRequired(project?.tasks ?? [])}
/>

<div class="flex justify-center">
	<Button variant="text" size="lg" href="/projects/{projectId}">Back to project</Button>
</div>
