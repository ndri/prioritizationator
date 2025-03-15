<script lang="ts">
	import { deleteProject, type ProjectWithTasks } from '$lib/db';
	import ChecklistIcon from './heroicons/micro/ChecklistIcon.svelte';
	import TrashIcon from './heroicons/micro/TrashIcon.svelte';
	import Button from './ui/Button.svelte';
	import SimpleDialog from './ui/SimpleDialog.svelte';

	interface Props {
		project: ProjectWithTasks;
	}

	const { project }: Props = $props();

	let deleteDialog = $state<SimpleDialog>();
</script>

<article
	class={[
		'flex flex-col items-start justify-between gap-4 rounded-lg p-5 shadow-sm',
		'bg-slate-50',
		'dark:bg-slate-900'
	]}
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
		<Button variant="secondary" size="xs" href="/projects/{project.id}" Icon={ChecklistIcon}>
			View tasks
		</Button>
		<Button variant="secondary" size="xs" onclick={() => deleteDialog?.open()} Icon={TrashIcon}>
			Delete
		</Button>
	</div>
</article>

<SimpleDialog
	bind:this={deleteDialog}
	title="Delete project"
	description="Are you sure you want to delete this project? This action cannot be undone."
	buttons={[
		{
			label: 'Delete',
			variant: 'primary',
			onclick: () => {
				deleteProject(project.id);
				deleteDialog?.close();
			}
		},
		{
			label: 'Cancel',
			variant: 'secondary',
			onclick: () => deleteDialog?.close()
		}
	]}
/>
