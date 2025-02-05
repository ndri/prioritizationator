<script lang="ts">
	import { deleteProject, type ProjectWithTasks } from '$lib/db';
	import type { ClassValue } from 'svelte/elements';
	import Button from './ui/Button.svelte';
	import ChecklistIcon from './heroicons/micro/ChecklistIcon.svelte';
	import TrashIcon from './heroicons/micro/TrashIcon.svelte';

	interface Props {
		project: ProjectWithTasks;
	}

	const { project }: Props = $props();
</script>

<article
	class="flex flex-col items-start gap-4 rounded-lg bg-white p-5 shadow-sm dark:bg-slate-950"
>
	<div class="flex flex-col gap-1">
		<h3>
			<a href="/projects/{project.id}" class="font-medium hover:opacity-70">
				{project.name}
			</a>
		</h3>
		<span class="text-xs text-slate-500 dark:text-slate-300">
			{project.tasks?.length} tasks
		</span>
	</div>
	<div class="grid w-full grid-cols-2 gap-2">
		<Button variant="secondary" size="xs" href="/projects/{project.id}">
			{#snippet icon(className)}
				<ChecklistIcon {className} />
			{/snippet}
			View tasks
		</Button>
		<Button variant="secondary" size="xs" onclick={() => deleteProject(project.id)}>
			{#snippet icon(className)}
				<TrashIcon {className} />
			{/snippet}
			Delete
		</Button>
	</div>
</article>
