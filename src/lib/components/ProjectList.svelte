<script lang="ts">
	import { deleteProject, getProjectsWithTasks } from '../db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import TrashIcon from '../components/heroicons/micro/TrashIcon.svelte';

	const projectsQuery = stateQuery(getProjectsWithTasks);
	let projects = $derived(projectsQuery.current);
</script>

{#if projects?.length}
	<section>
		<h2 class="mb-4 text-xl font-medium">Your projects:</h2>
		<ul class="ml-8 list-disc">
			{#each projects as project}
				<li>
					<div class="flex items-center gap-1.5">
						<a href="/projects/{project.id}">{project.name}</a>
						<span class="text-xs text-slate-500 dark:text-slate-300">
							({project.tasks.length} tasks)
						</span>
						<button
							class="flex justify-center rounded-md p-1 text-slate-400 hover:bg-red-100 dark:text-slate-200 dark:hover:bg-red-900"
							onclick={() => deleteProject(project.id)}
						>
							<TrashIcon />
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</section>
{/if}
