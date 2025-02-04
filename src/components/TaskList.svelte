<script lang="ts">
	import { deleteTask, type ScoredTask } from '../db';
	import TrashIcon from '../components/heroicons/micro/TrashIcon.svelte';

	interface Props {
		tasks?: ScoredTask[];
	}

	const { tasks }: Props = $props();
</script>

{#if tasks?.length}
	<section>
		<h2 class="mb-4 text-xl font-medium">Tasks</h2>
		<ol class="flex flex-col divide-y-2 divide-solid divide-slate-900 rounded-xl bg-slate-800">
			{#each tasks as task}
				<li class="flex items-center gap-2 px-5 py-3">
					<div class="grow">{task.name}</div>
					<div>Wins: {task.wins}</div>
					<div>Losses: {task.losses}</div>
					<div>Score: {task.score}</div>
					<button
						class="flex justify-center rounded-md p-2.5 hover:bg-red-900"
						onclick={() => deleteTask(task.id)}
					>
						<TrashIcon className="text-slate-200" />
					</button>
				</li>
			{/each}
		</ol>
	</section>
{/if}
