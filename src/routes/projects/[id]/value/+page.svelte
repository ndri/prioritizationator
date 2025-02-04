<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import Button from '../../../../components/ui/Button.svelte';
	import { getProject, getRandomTaskPair, recordLoss, recordWin } from '../../../../db';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);

	let taskPairPromise = $state(getRandomTaskPair(projectId));

	const handleClick = ({ winner, loser }: { winner: number; loser: number }) => {
		taskPairPromise = getRandomTaskPair(projectId);
		recordWin(winner);
		recordLoss(loser);
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
			onclick={() => handleClick({ winner: task1.id, loser: task2.id })}
		>
			{task1.name}
		</Button>
		<Button
			variant="secondary"
			size="xl"
			onclick={() => handleClick({ winner: task2.id, loser: task1.id })}
		>
			{task2.name}
		</Button>
	</div>
{/await}
