<script lang="ts">
	import PrioritizationMatrix from '$lib/components/PrioritizationMatrix.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getProject } from '$lib/db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<div class="mx-auto flex w-full max-w-2xl flex-col gap-8">
	{#if project && project.tasks}
		<div class="flex flex-col gap-4">
			<h2 class="text-2xl font-medium">Amazing!</h2>
			<p class="text-sm">The tasks are now prioritized:</p>
			<div class="mx-auto w-full max-w-xl">
				<PrioritizationMatrix tasks={project.tasks} />
			</div>
			<p class="text-sm">You can now</p>
			<ul class="flex list-disc flex-col gap-2 pl-6 text-sm">
				<li>start working on the tasks and marking them as complete,</li>
				<li>brainstorm more tasks to prioritize in addition to these,</li>
				<li>rate the tasks again if you're not happy with the results yet.</li>
			</ul>
		</div>
		<div class="flex justify-between">
			<Button href="/projects/{projectId}/intro/3" size="lg" variant="secondary">Go back</Button>
			<Button href="/projects/{projectId}" size="lg">View project</Button>
		</div>
	{/if}
</div>
