<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import Button from '../../../../components/ui/Button.svelte';
	import { getProject, getTaskPair, recordLoss, recordTie, recordWin } from '../../../../db';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);

	let taskPairPromise = $state(getTaskPair(projectId));

	const recordResult = ({ winnerId, loserId }: { winnerId: number; loserId: number }) => {
		taskPairPromise = getTaskPair(projectId);
		recordWin(winnerId);
		recordLoss(loserId);
	};

	const recordTieResult = ({ task1Id, task2Id }: { task1Id: number; task2Id: number }) => {
		taskPairPromise = getTaskPair(projectId);
		recordTie(task1Id);
		recordTie(task2Id);
	};
</script>

<a href="/projects/{projectId}">Back to project</a>

<h1 class="text-3xl font-bold">{project?.name} value rating</h1>

<h2 class="text-lg font-medium">Which of these is more valuable?</h2>
{#await taskPairPromise then [task1, task2]}
	<div class="grid grid-cols-2 gap-4">
		<Button
			variant="secondary"
			size="xl"
			onclick={() => recordResult({ winnerId: task1.id, loserId: task2.id })}
		>
			{task1.name}
		</Button>
		<Button
			variant="secondary"
			size="xl"
			onclick={() => recordResult({ winnerId: task2.id, loserId: task1.id })}
		>
			{task2.name}
		</Button>
	</div>
	<Button
		variant="secondary"
		size="xl"
		onclick={() => recordTieResult({ task1Id: task1.id, task2Id: task2.id })}
	>
		Skip (both are equally good/bad)
	</Button>
{/await}
