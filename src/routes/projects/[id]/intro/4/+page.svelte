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

<div class="mx-auto flex w-full max-w-xl flex-col gap-8">
	{#if project && project.tasks}
		<div class="flex flex-col gap-4">
			<h2 class="text-2xl font-medium">Great!</h2>
			<p class="text-sm">The tasks are now rated by how much value they provide:</p>
			<div class="mx-auto w-full max-w-xl">
				<PrioritizationMatrix tasks={project.tasks} />
			</div>
			<p class="text-sm">
				Let's finish by rating the tasks by the amount of effort required to complete them.
			</p>
		</div>
		<div class="flex justify-between">
			<Button href="/projects/{projectId}/intro/3" size="lg" variant="secondary">Go back</Button>
			<Button href="/projects/{projectId}/intro/5" size="lg">Rate effort</Button>
		</div>
	{/if}
</div>
