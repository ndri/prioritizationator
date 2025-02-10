<script lang="ts">
	import { getProjectsWithTasks } from '../db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import NewProjectCard from './NewProjectCard.svelte';

	const projectsQuery = stateQuery(getProjectsWithTasks);
	let projects = $derived(projectsQuery.current);
</script>

{#if projects?.length}
	<section>
		<h2 class="mb-4 text-xl font-medium">Your projects</h2>
		<ul class="grid grid-cols-1 gap-3 md:grid-cols-2">
			<NewProjectCard />
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</ul>
	</section>
{/if}
