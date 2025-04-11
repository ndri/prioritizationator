<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { type Task } from '$lib/db';
	import { getTaskPair } from '$lib/utils/tasks';
	import PairingCard from './PairingCard.svelte';

	interface Props {
		projectId: number;
		dimension: 'value' | 'ease';
		recordWin: (winnerId: number, loserId: number) => Promise<void>;
		recordDraw: (taskId1: number, taskId2: number) => Promise<void>;
	}

	const { projectId, dimension, recordWin, recordDraw }: Props = $props();

	let task1 = $state<Task>();
	let task2 = $state<Task>();

	const resetTasks = async (avoidTasks: number[] = []) => {
		const taskPair = await getTaskPair(projectId, dimension, avoidTasks);
		if (!taskPair) return;
		task1 = taskPair[0];
		task2 = taskPair[1];
	};
	resetTasks();

	const recordResult = (winnerId: number, loserId: number) => {
		recordWin(winnerId, loserId).then(() => resetTasks());
	};

	const recordDrawResult = (taskId1: number, taskId2: number) => {
		// Avoid one task so the algorithm doesn't pick the same two tasks again
		recordDraw(taskId1, taskId2).then(() => resetTasks([taskId1]));
	};
</script>

<div class="flex flex-col gap-4">
	<div class="grid grid-cols-2 gap-4">
		<PairingCard onclick={() => task1 && task2 && recordResult(task1.id, task2.id)}>
			{#if task1}{task1.name}{:else}&nbsp;{/if}
		</PairingCard>
		<PairingCard onclick={() => task1 && task2 && recordResult(task2.id, task1.id)}>
			{#if task2}{task2.name}{:else}&nbsp;{/if}
		</PairingCard>
	</div>
	<Button
		variant="secondary"
		size="xl"
		onclick={() => task1 && task2 && recordDrawResult(task1.id, task2.id)}
	>
		Both are about equal
	</Button>
</div>
