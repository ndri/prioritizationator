<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteProject, editProjectName, type ProjectWithTasksAndBlockings } from '$lib/db';
	import {
		easeRatingsProgress,
		filterIncompleteTasks,
		ratingsRequired,
		valueRatingsProgress
	} from '$lib/utils/tasks';
	import { getTimeAgo } from '$lib/utils/time';
	import {
		TrashIcon,
		ChecklistIcon,
		EllipsisVerticalIcon,
		PencilSquareIcon,
		StarIcon,
		WrenchScrewdriverIcon
	} from '@sidekickicons/svelte/20/solid';
	import Dot from './illustrations/Dot.svelte';
	import Menu from './Menu.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import Tooltip from './Tooltip.svelte';
	import Button from './ui/Button.svelte';
	import EditDialog from './ui/EditDialog.svelte';
	import SimpleDialog from './ui/SimpleDialog.svelte';

	interface Props {
		project: ProjectWithTasksAndBlockings;
	}

	const { project }: Props = $props();

	const incompleteTasks = $derived(filterIncompleteTasks(project.tasks));
	const valueProgress = $derived(valueRatingsProgress(incompleteTasks));
	const easeProgress = $derived(easeRatingsProgress(incompleteTasks));
	const requiredRatings = $derived(ratingsRequired(incompleteTasks) * 2);
	const progress = $derived(Math.round(((valueProgress + easeProgress) / requiredRatings) * 100));

	let deleteDialog = $state<SimpleDialog>();
	let editDialog = $state<EditDialog>();
</script>

<article class={['flex flex-col gap-3 rounded-lg p-5', 'bg-main-50', 'dark:bg-main-900']}>
	<div class="flex items-start justify-between gap-2">
		<div class="mb-2 flex flex-col gap-2">
			<h3>
				<a
					href="/projects/{project.id}"
					class={[
						'hover:text-main-500 dark:hover:text-accent-400 font-medium',
						'focus-outline rounded-xs'
					]}
				>
					{project.name}
				</a>
			</h3>
			<div class="text-main-500 dark:text-main-400 flex flex-wrap items-center gap-2 text-xs">
				<div>{incompleteTasks.length} tasks</div>
				<Dot />
				<time datetime={project.modifiedAt.toISOString()} title={project.modifiedAt.toISOString()}>
					updated {getTimeAgo(project.modifiedAt)}
				</time>
			</div>
		</div>

		<Menu
			items={[
				{
					label: 'View tasks',
					Icon: ChecklistIcon,
					onSelect: () => goto(`/projects/${project.id}`)
				},
				{
					label: 'Edit project name',
					Icon: PencilSquareIcon,
					onSelect: () => {
						if (editDialog) {
							editDialog.setValue(project.name);
							editDialog.open();
						}
					}
				},
				{
					label: 'Rate value',
					Icon: StarIcon,
					onSelect: () => goto(`/projects/${project.id}/value`)
				},
				{
					label: 'Rate effort',
					Icon: WrenchScrewdriverIcon,
					onSelect: () => goto(`/projects/${project.id}/ease`)
				},
				{
					label: 'Delete project',
					Icon: TrashIcon,
					onSelect: () => deleteDialog?.open()
				}
			]}
			class="flex items-center p-1"
		>
			{#snippet button(props)}
				<Button size="xl" variant="text" LeftIcon={EllipsisVerticalIcon} class="p-1.5" {...props} />
			{/snippet}
		</Menu>
	</div>
	<Tooltip text="{progress || 0}% rated" class="relative">
		<ProgressBar progress={progress || 0} total={100} size="xs" />
	</Tooltip>
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

<EditDialog
	bind:this={editDialog}
	label="Project name"
	submit={(value) => editProjectName(project.id, value)}
/>
