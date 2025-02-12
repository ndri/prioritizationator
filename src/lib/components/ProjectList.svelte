<script lang="ts">
	import { getProjectsWithTasks } from '../db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import NewProjectCard from './NewProjectCard.svelte';

	const projectsQuery = stateQuery(getProjectsWithTasks);
	let projects = $derived(projectsQuery.current ?? []);
	let reversedProjects = $derived(projects.toReversed());
</script>

<section>
	<h2 class="mb-4 text-xl font-medium">Your projects</h2>
	<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
		<NewProjectCard />
		{#each reversedProjects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</section>
