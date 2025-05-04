<script lang="ts">
	import { ArrowLeftIcon, StarIcon } from '@sidekickicons/svelte/20/solid';
	import PrioritizationMatrix from '$lib/components/PrioritizationMatrix.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getProject } from '$lib/db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { filterDoableTasks } from '$lib/utils/tasks';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<div class="mx-auto flex w-full max-w-2xl flex-col gap-8">
	{#if project && project.tasks}
		{@const doableTasks = filterDoableTasks(project.tasks)}
		<div class="flex flex-col gap-4">
			<h2 class="text-2xl font-medium">Let's get those tasks in order!</h2>
			<p class="text-sm">
				Prioritizationator works by rating your tasks by how much <strong>value</strong>
				they provide in your project and the
				<strong>effort</strong>
				required to complete them:
			</p>
			<div class="mx-auto w-full max-w-xl">
				<PrioritizationMatrix tasks={doableTasks} />
			</div>
			<p class="text-sm">
				We want to focus on the <strong>Low Hanging Fruits</strong>
				that will provide a lot of value for little effort and avoid the
				<strong>Traps</strong>
				that do the opposite.
			</p>
			<p class="text-sm">Let's start by rating the tasks by their value.</p>
		</div>
		<div class="flex justify-end gap-2">
			<Button
				href="/projects/{projectId}/intro/1"
				size="lg"
				variant="secondary"
				LeftIcon={ArrowLeftIcon}
			>
				Go back
			</Button>
			<Button href="/projects/{projectId}/intro/3" size="lg" LeftIcon={StarIcon}>Rate value</Button>
		</div>
	{/if}
</div>
