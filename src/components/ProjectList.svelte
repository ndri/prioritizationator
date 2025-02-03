<script lang="ts">
	import { db } from '../db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import TrashIcon from '../components/heroicons/micro/TrashIcon.svelte';

	const projectsQuery = stateQuery(() => db.projects.toArray());
	let projects = $derived(projectsQuery.current);

	async function deleteProject(id: number) {
		await db.projects.delete(id);
	}
</script>

{#if projects}
	<section>
		<h2 class="mb-4 text-xl font-medium">Your projects:</h2>
		<ul class="ml-8 list-disc">
			{#each projects as project}
				<li>
					<div class="flex items-center gap-1.5">
						<a href="/projects/{project.id}">{project.name}</a>
						<button
							class="rounded-md p-1 hover:bg-slate-700"
							onclick={() => deleteProject(project.id)}
							><TrashIcon className="text-slate-200" /></button
						>
					</div>
				</li>
			{/each}
		</ul>
	</section>
{/if}
