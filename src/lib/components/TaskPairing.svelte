<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { getTaskPair, type Task } from '$lib/db';
	import PairingCard from './PairingCard.svelte';

	interface Props {
		projectId: number;
		dimension: 'value' | 'ease';
		recordWin: (winnerId: number, loserId: number) => void;
		recordDraw: (taskId1: number, taskId2: number) => void;
	}

	const { projectId, dimension, recordWin, recordDraw }: Props = $props();

	const newTasks = (avoid?: number[]) => getTaskPair(projectId, dimension, avoid);

	let taskPairPromise = $state(newTasks());

	const resetTasks = (avoid?: number[]) => {
		taskPairPromise = newTasks(avoid);
	};

	const recordResult = (winnerId: number, loserId: number) => {
		resetTasks([winnerId, loserId]);
		recordWin(winnerId, loserId);
	};

	const recordDrawResult = (taskId1: number, taskId2: number) => {
		resetTasks([taskId1, taskId2]);
		recordDraw(taskId1, taskId2);
	};
</script>

{#snippet pairing(task1: Task | undefined, task2: Task | undefined)}
	<div class="flex flex-col gap-4">
		<div class="grid grid-cols-2 gap-4">
			<PairingCard onclick={task1 && task2 ? () => recordResult(task1.id, task2.id) : () => {}}>
				{#if task1}{task1.name}{:else}&nbsp;{/if}
			</PairingCard>
			<PairingCard onclick={task1 && task2 ? () => recordResult(task2.id, task1.id) : () => {}}>
				{#if task2}{task2.name}{:else}&nbsp;{/if}
			</PairingCard>
		</div>
		<Button
			variant="secondary"
			size="xl"
			onclick={task1 && task2 ? () => recordDrawResult(task1.id, task2.id) : () => {}}
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
