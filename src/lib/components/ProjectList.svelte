<script lang="ts">
	import { getProjectsWithTasks } from '../db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import NewProjectCard from './NewProjectCard.svelte';
	import Button from './ui/Button.svelte';
	import PlusIcon from './heroicons/mini/PlusIcon.svelte';
	import WritingDownIdeasIllustration from './illustrations/WritingDownIdeasIllustration.svelte';

	const projectsQuery = stateQuery(getProjectsWithTasks);
	let projects = $derived(projectsQuery.current ?? []);
	let reversedProjects = $derived(projects.toReversed());
</script>

{#if projects.length > 0}
	<section class="flex flex-col gap-4">
		<h2 class="text-2xl font-medium">Projects</h2>
		<div class="grid grid-cols-1 gap-3 @lg:grid-cols-2">
			<NewProjectCard />
			{#each reversedProjects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</section>
{:else}
	<section class="flex flex-col items-center gap-8">
		<h2 class="text-2xl font-medium">
			Welcome to
			<span class="inline-flex">
				<span class="text-accent-600 dark:text-accent-500">Prioritizationator</span>
				!
			</span>
		</h2>
		<WritingDownIdeasIllustration class="my-4 h-auto w-64" />
		<div class="flex flex-col items-center gap-4">
			<h3 class="font-medium">Ready to get your tasks in order?</h3>
			<p class="text-main-500 dark:text-main-400 text-sm">
				Get started by creating a project and adding tasks to it.
			</p>
		</div>
		<Button href="/projects/new" size="lg" Icon={PlusIcon}>New project</Button>
	</section>
{/if}
