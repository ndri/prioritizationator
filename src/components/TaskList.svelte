<script lang="ts">
	import { deleteTask, type Task } from '../db';
	import TrashIcon from '../components/heroicons/micro/TrashIcon.svelte';

	interface Props {
		tasks?: Task[];
	}

	const { tasks }: Props = $props();
</script>

{#if tasks?.length}
	<section>
		<h2 class="mb-4 text-xl font-medium">Tasks:</h2>
		<ol class="ml-8 list-decimal">
			{#each tasks as task}
				<li>
					<div class="flex items-center gap-1.5">
						<span>{task.name}</span>
						<button class="rounded-md p-1 hover:bg-slate-700" onclick={() => deleteTask(task.id)}
							><TrashIcon className="text-slate-200" /></button
						>
					</div>
				</li>
			{/each}
		</ol>
	</section>
{/if}
