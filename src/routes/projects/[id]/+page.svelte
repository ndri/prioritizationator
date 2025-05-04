<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import NewTaskForm from '$lib/components/NewTaskForm.svelte';
	import { deleteProject, editProjectName, getProject, resetRatings } from '$lib/db';
	import type { PageProps } from './$types';
	import {
		easeRatingsProgress,
		filterBlockedTasks,
		filterCompletedTasks,
		filterDoableTasks,
		filterIncompleteTasks,
		filterUnblockedTasks,
		minTasksForRating,
		ratingsRequired,
		sortTasksByTotalRating,
		tasksReadyForRating,
		valueRatingsProgress
	} from '$lib/utils/tasks';
	import PrioritizationMatrix from '$lib/components/PrioritizationMatrix.svelte';
	import RatingCard from '$lib/components/RatingCard.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import {
		ArrowPathIcon,
		EllipsisVerticalIcon,
		PencilSquareIcon,
		TrashIcon
	} from '@sidekickicons/svelte/20/solid';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	import SimpleDialog from '$lib/components/ui/SimpleDialog.svelte';
	import EditDialog from '$lib/components/ui/EditDialog.svelte';
	import { slide } from 'svelte/transition';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import TodoTasks from '$lib/components/TodoTasks.svelte';
	import BlockedTasks from '$lib/components/BlockedTasks.svelte';
	import CompletedTasks from '$lib/components/CompletedTasks.svelte';
	import { createTitle } from '$lib/utils/title';

	let { data }: PageProps = $props();

	const projectId = $derived(Number(data.id));
	const projectQuery = stateQuery(
		() => getProject(projectId),
		() => [projectId]
	);
	const project = $derived(projectQuery.current);

	let deleteDialog = $state<SimpleDialog>();
	let editDialog = $state<EditDialog>();
	let resetDialog = $state<SimpleDialog>();

	let tab = $state<'todo' | 'matrix' | 'blocked' | 'completed'>('todo');
</script>

<svelte:head><title>{createTitle(project?.name)}</title></svelte:head>

{#if project}
	<div class="flex justify-between">
		<h2 class="text-2xl font-medium">{project.name}</h2>
		<Menu
			items={[
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
					label: 'Reset task ratings',
					Icon: ArrowPathIcon,
					onSelect: () => resetDialog?.open()
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
				<Button size="xl" variant="text" Icon={EllipsisVerticalIcon} class="p-1.5" {...props} />
			{/snippet}
		</Menu>
	</div>

	{#if project.tasks}
		<div class="flex flex-col">
			{#if tasksReadyForRating(project.tasks)}
				{@const incompleteTasks = filterIncompleteTasks(project.tasks)}
				<div class="grid gap-4 @lg:grid-cols-2" transition:slide>
					<RatingCard
						title="Value"
						ratingsProgress={valueRatingsProgress(incompleteTasks)}
						ratingsRequired={ratingsRequired(incompleteTasks)}
						ratingPath="/projects/{projectId}/value"
					/>
					<RatingCard
						title="Effort"
						ratingsProgress={easeRatingsProgress(incompleteTasks)}
						ratingsRequired={ratingsRequired(incompleteTasks)}
						ratingPath="/projects/{projectId}/ease"
					/>
				</div>
			{:else}
				<p class="text-main-500 dark:text-main-400" transition:slide>
					You need at least {minTasksForRating} unrated tasks to rate them.
				</p>
			{/if}
		</div>

		{@const incompleteTasks = filterIncompleteTasks(project.tasks)}
		{@const sortedIncompleteTasks = sortTasksByTotalRating(incompleteTasks)}
		{@const blockedTasks = filterBlockedTasks(sortedIncompleteTasks)}
		{@const unblockedTasks = filterUnblockedTasks(sortedIncompleteTasks)}

		{@const completedTasks = filterCompletedTasks(project.tasks)}

		{@const doableTasks = filterDoableTasks(project.tasks)}

		{@const tabValues = [
			{ id: 'todo', label: 'To do', tag: String(unblockedTasks.length || '') },
			...(blockedTasks.length
				? [{ id: 'blocked', label: 'Blocked', tag: String(blockedTasks.length) }]
				: []),
			...(completedTasks.length
				? [{ id: 'completed', label: 'Completed', tag: String(completedTasks.length) }]
				: []),
			...(doableTasks.length > 1 ? [{ id: 'matrix', label: 'Matrix' }] : [])
		]}
		<div class="flex flex-col gap-4">
			{#if tabValues.length > 1}
				<Tabs values={tabValues} bind:selected={tab} />
			{/if}
			{#if tab === 'todo'}
				<TodoTasks {unblockedTasks} />
				<NewTaskForm {projectId} />
			{:else if tab === 'blocked'}
				<BlockedTasks {blockedTasks} />
			{:else if tab === 'completed'}
				<CompletedTasks {completedTasks} />
			{:else if tab === 'matrix'}
				<PrioritizationMatrix tasks={doableTasks} />
			{/if}
		</div>

		<SimpleDialog
			bind:this={deleteDialog}
			title="Delete project"
			description="Are you sure you want to delete this project? This action cannot be undone."
			buttons={[
				{
					label: 'Delete',
					variant: 'primary',
					onclick: () => {
						deleteProject(projectId);
						goto('/');
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
			submit={(value) => editProjectName(projectId, value)}
		/>

		<SimpleDialog
			bind:this={resetDialog}
			title="Reset ratings"
			description="Are you sure you want to reset ratings for all tasks? This action cannot be undone."
			buttons={[
				{
					label: 'Reset',
					variant: 'primary',
					onclick: () => {
						resetRatings(projectId);
						resetDialog?.close();
					}
				},
				{
					label: 'Cancel',
					variant: 'secondary',
					onclick: () => resetDialog?.close()
				}
			]}
		/>
	{/if}
{/if}
