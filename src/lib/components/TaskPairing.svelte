<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { getTaskPair, type Task } from '$lib/db';
	import PairingCard from './PairingCard.svelte';

	interface Props {
		projectId: number;
		dimension: 'value' | 'ease';
		recordWin: (winnerId: number) => void;
		recordLoss: (loserId: number) => void;
		recordTie: (taskId: number) => void;
	}

	const { projectId, dimension, recordWin, recordLoss, recordTie }: Props = $props();

	const newTasks = (avoid?: number[]) => getTaskPair(projectId, dimension, avoid);

	let taskPairPromise = $state(newTasks());

	const resetTasks = (avoid?: number[]) => {
		taskPairPromise = newTasks(avoid);
	};

	const recordResult = ({ winnerId, loserId }: { winnerId: number; loserId: number }) => {
		resetTasks([winnerId, loserId]);
		recordWin(winnerId);
		recordLoss(loserId);
	};

	const recordTieResult = ({ task1Id, task2Id }: { task1Id: number; task2Id: number }) => {
		resetTasks([task1Id, task2Id]);
		recordTie(task1Id);
		recordTie(task2Id);
	};
</script>

{#snippet pairing(task1: Task | undefined, task2: Task | undefined)}
	<div class="flex flex-col gap-4">
		<div class="grid grid-cols-2 gap-4">
			<PairingCard
				onclick={task1 && task2
					? () => recordResult({ winnerId: task1.id, loserId: task2.id })
					: () => {}}
			>
				{#if task1}{task1.name}{:else}&nbsp;{/if}
			</PairingCard>
			<PairingCard
				onclick={task1 && task2
					? () => recordResult({ winnerId: task2.id, loserId: task1.id })
					: () => {}}
			>
				{#if task2}{task2.name}{:else}&nbsp;{/if}
			</PairingCard>
		</div>
		<Button
			variant="secondary"
			size="xl"
			onclick={task1 && task2
				? () => recordTieResult({ task1Id: task1.id, task2Id: task2.id })
				: () => {}}
		>
			Skip (both are equal)
		</Button>
	</div>
{/snippet}

{#await taskPairPromise}
	{@render pairing(undefined, undefined)}
{:then [task1, task2]}
	{@render pairing(task1, task2)}
{/await}
