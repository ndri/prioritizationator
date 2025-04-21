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

{#if project && project.tasks}
	<div class="flex flex-col gap-4">
		<h2 class="text-2xl font-medium">Let's get those tasks in order!</h2>
		<p class="text-sm">
			Prioritizationator works by rating your tasks by how much <strong>value</strong>
			they provide in your project and the
			<strong>effort</strong>
			required to complete them:
		</p>
		<div class="mx-auto w-full max-w-xl">
			<PrioritizationMatrix tasks={project.tasks} />
		</div>
		<p class="text-sm">
			We want to focus on the <strong>Low Hanging Fruits</strong>
			that will provide a lot of value for little effort and avoid the
			<strong>Traps</strong>
			that do the opposite.
		</p>
		<p class="text-sm">Let's start by rating the tasks by their value.</p>
	</div>
	<div class="flex justify-between">
		<Button href="/projects/{projectId}/intro/1" size="lg" variant="secondary">Go back</Button>
		<Button href="/projects/{projectId}/intro/3" size="lg">Rate value</Button>
	</div>
{/if}
