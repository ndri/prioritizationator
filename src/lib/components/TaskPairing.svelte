<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getProject, getTaskPair } from '$lib/db';

	interface Props {
		projectId: number;
		recordWin: (winnerId: number) => void;
		recordLoss: (loserId: number) => void;
		recordTie: (taskId: number) => void;
	}

	const { projectId, recordWin, recordLoss, recordTie }: Props = $props();

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
		Skip (both are equal)
	</Button>
{/await}
