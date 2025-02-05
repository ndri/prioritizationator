<script lang="ts">
	import { deleteTask, type Task } from '../db';
	import TrashIcon from '../components/heroicons/micro/TrashIcon.svelte';

	interface Props {
		tasks?: Task[];
	}

	const { tasks }: Props = $props();

	const sortedTasks = $derived(
		tasks?.toSorted((a, b) => {
			const aScore = (a.valueScore ?? 1) * (a.easeScore ?? 1);
			const bScore = (b.valueScore ?? 1) * (b.easeScore ?? 1);
			return bScore - aScore;
		})
	);
</script>

{#if sortedTasks?.length}
	<section>
		<h2 class="mb-4 text-xl font-medium">Tasks</h2>
		<ol
			class="flex flex-col divide-y divide-solid divide-slate-200 rounded-xl bg-slate-100 dark:divide-slate-900 dark:bg-slate-800"
		>
			{#each sortedTasks as task}
				<li class="flex items-center gap-2 px-5 py-3">
					<div class="grow">{task.name}</div>
					<div>Value: {task.valueScore}</div>
					<div>Ease: {task.easeScore}</div>
					<button
						class="flex justify-center rounded-md p-2.5 text-slate-400 hover:bg-red-100 dark:text-slate-200 dark:hover:bg-red-900"
						onclick={() => deleteTask(task.id)}
					>
						<TrashIcon />
					</button>
				</li>
			{/each}
		</ol>
	</section>
{/if}
