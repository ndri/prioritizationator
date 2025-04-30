<script lang="ts">
	import ArrowLeftIcon from '$lib/components/heroicons/mini/ArrowLeftIcon.svelte';
	import CheckIcon from '$lib/components/heroicons/mini/CheckIcon.svelte';
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
			<h2 class="text-2xl font-medium">Amazing!</h2>
			<p class="text-sm">The tasks are now prioritized:</p>
			<div class="mx-auto w-full max-w-xl">
				<PrioritizationMatrix tasks={doableTasks} />
			</div>
			<p class="text-sm">You can now</p>
			<ul
				class="marker:text-main-400 dark:marker:text-main-500 flex list-disc flex-col gap-2 pl-6 text-sm"
			>
				<li>start working on the tasks and marking them as complete,</li>
				<li>brainstorm more tasks to prioritize in addition to these,</li>
				<li>rate the tasks some more if you're not happy with the results yet.</li>
			</ul>
		</div>
		<div class="flex justify-end gap-2">
			<Button
				href="/projects/{projectId}/intro/3"
				size="lg"
				variant="secondary"
				Icon={ArrowLeftIcon}
			>
				Go back
			</Button>
			<Button href="/projects/{projectId}" size="lg" Icon={CheckIcon}>View project</Button>
		</div>
	{/if}
</div>
