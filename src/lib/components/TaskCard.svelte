<script lang="ts">
	import {
		deleteTask,
		editTaskName,
		getOtherTasksInProject,
		getTaskIdsBlockedByTask,
		getTaskIdsBlockingToTask,
		markTaskBlockedBy,
		markTaskBlockingTo,
		markTaskComplete,
		type Task
	} from '$lib/db';
	import { filterIncompleteTasks, taskEaseIsRated, taskValueIsRated } from '$lib/utils/tasks';
	import EllipsisVerticalIcon from './heroicons/mini/EllipsisVerticalIcon.svelte';
	import HandRaisedIcon from './heroicons/mini/HandRaisedIcon.svelte';
	import NoSymbolIcon from './heroicons/mini/NoSymbolIcon.svelte';
	import PencilSquareIcon from './heroicons/mini/PencilSquareIcon.svelte';
	import TrashIcon from './heroicons/mini/TrashIcon.svelte';
	import Menu from './Menu.svelte';
	import RatingBadge from './RatingBadge.svelte';
	import Button from './ui/Button.svelte';
	import Checkbox from './ui/Checkbox.svelte';
	import EditDialog from './ui/EditDialog.svelte';
	import { slide } from 'svelte/transition';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import MultiSelectDialog from './ui/MultiSelectDialog.svelte';
	import BlockedByIndicator from './BlockedByIndicator.svelte';

	interface Props {
		task: Task;
		showBadges?: boolean;
	}

	const { task, showBadges = false }: Props = $props();

	let editDialog = $state<EditDialog>();
	let blockedByDialog = $state<MultiSelectDialog<number>>();
	let blockingToDialog = $state<MultiSelectDialog<number>>();
	let complete = $state<boolean>(task.complete);

	const taskIdsBlockingToTaskQuery = stateQuery(() => getTaskIdsBlockingToTask(task.id));
	const taskIdsBlockingToTask = $derived(taskIdsBlockingToTaskQuery.current ?? []);

	const taskIdsBlockedByTaskQuery = stateQuery(() => getTaskIdsBlockedByTask(task.id));
	const taskIdsBlockedByTask = $derived(taskIdsBlockedByTaskQuery.current ?? []);

	const otherTasksQuery = stateQuery(() => getOtherTasksInProject(task.projectId, task.id));
	const otherTasks = $derived(otherTasksQuery.current ?? []);
	const otherIncompleteTasks = $derived(filterIncompleteTasks(otherTasks));
</script>

<li class="flex min-h-[60px] items-center gap-4 py-2 pr-4 pl-5" transition:slide>
	{#if taskIdsBlockingToTask.length && !task.complete}
		<BlockedByIndicator
			tasksCount={taskIdsBlockingToTask.length}
			onclick={() => {
				if (blockedByDialog) {
					blockedByDialog.setValues(taskIdsBlockingToTask);
					blockedByDialog.open();
				}
			}}
		/>
	{:else if showBadges}
		<Checkbox
			id="taskCheckbox{task.id}"
			label={task.name}
			bind:checked={complete}
			size="md"
			onchange={() => markTaskComplete(task.id, complete)}
		/>
	{/if}
	<!-- <div class="text-main-500 dark:text-main-500 text-sm">{task.id}</div> -->
	<div class="grow text-sm">{task.name}</div>
	{#if showBadges && !task.complete}
		<RatingBadge label="Value" rating={task.valueRating ?? -1} rated={taskValueIsRated(task)} />
		<RatingBadge label="Ease" rating={task.easeRating ?? -1} rated={taskEaseIsRated(task)} />
	{/if}
	<Menu
		items={[
			{
				label: 'Edit task',
				Icon: PencilSquareIcon,
				onSelect: () => {
					if (editDialog && task) {
						editDialog.setValue(task.name);
						editDialog.open();
					}
				}
			},
			{
				label: 'Blocked by...',
				Icon: NoSymbolIcon,
				onSelect: () => {
					if (blockedByDialog) {
						blockedByDialog.setValues(taskIdsBlockingToTask);
						blockedByDialog.open();
					}
				}
			},
			{
				label: 'Blocking to...',
				Icon: HandRaisedIcon,
				onSelect: () => {
					if (blockingToDialog) {
						blockingToDialog.setValues(taskIdsBlockedByTask);
						blockingToDialog.open();
					}
				}
			},
			{
				label: 'Delete task',
				Icon: TrashIcon,
				onSelect: () => deleteTask(task.id)
			}
		]}
		class="flex items-center p-1"
	>
		{#snippet button(props)}
			<Button size="xl" variant="text" Icon={EllipsisVerticalIcon} {...props} class="p-1.5" />
		{/snippet}
	</Menu>
</li>

<EditDialog bind:this={editDialog} label="Task" submit={(value) => editTaskName(task.id, value)} />

<MultiSelectDialog
	bind:this={blockedByDialog}
	options={otherIncompleteTasks.map((task) => ({ value: task.id, label: task.name }))}
	submit={(value) => markTaskBlockedBy(task.id, value)}
>
	{#snippet label()}
		<p>
			Task <span class="text-accent-600 dark:text-accent-500 font-medium">{task.name}</span>
			is blocked by these tasks:
		</p>
	{/snippet}
</MultiSelectDialog>

<MultiSelectDialog
	bind:this={blockingToDialog}
	options={otherIncompleteTasks.map((task) => ({ value: task.id, label: task.name }))}
	submit={(value) => markTaskBlockingTo(task.id, value)}
>
	{#snippet label()}
		<p>
			Task <span class="text-accent-600 dark:text-accent-500 font-medium">{task.name}</span>
			is blocking these tasks:
		</p>
	{/snippet}
</MultiSelectDialog>
