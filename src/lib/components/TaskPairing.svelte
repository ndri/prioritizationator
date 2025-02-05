<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getProject, getTaskPair } from '$lib/db';
	import PairingCard from './PairingCard.svelte';

	interface Props {
		projectId: number;
		dimension: 'value' | 'ease';
		recordWin: (winnerId: number) => void;
		recordLoss: (loserId: number) => void;
		recordTie: (taskId: number) => void;
	}

	const { projectId, dimension, recordWin, recordLoss, recordTie }: Props = $props();

	const newTasks = () => getTaskPair(projectId, dimension);

	let taskPairPromise = $state(newTasks());

	const resetTasks = () => {
		taskPairPromise = newTasks();
	};

	const recordResult = ({ winnerId, loserId }: { winnerId: number; loserId: number }) => {
		resetTasks();
		recordWin(winnerId);
		recordLoss(loserId);
	};

	const recordTieResult = ({ task1Id, task2Id }: { task1Id: number; task2Id: number }) => {
		resetTasks();
		recordTie(task1Id);
		recordTie(task2Id);
	};
</script>

{#await taskPairPromise then [task1, task2]}
	<div class="flex flex-col gap-4">
		<div class="grid grid-cols-2 gap-4">
			<PairingCard onclick={() => recordResult({ winnerId: task1.id, loserId: task2.id })}>
				{task1.name}
			</PairingCard>
			<PairingCard onclick={() => recordResult({ winnerId: task2.id, loserId: task1.id })}>
				{task2.name}
			</PairingCard>
		</div>
		<Button
			variant="secondary"
			size="xl"
			onclick={() => recordTieResult({ task1Id: task1.id, task2Id: task2.id })}
		>
			Skip (both are equal)
		</Button>
	</div>
{/await}
