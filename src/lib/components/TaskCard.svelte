<script lang="ts">
	import { deleteTask, editTaskName, markTaskComplete, type Task } from '$lib/db';
	import { taskEaseIsRated, taskValueIsRated } from '$lib/utils/tasks';
	import EllipsisVerticalIcon from './heroicons/mini/EllipsisVerticalIcon.svelte';
	import PencilSquareIcon from './heroicons/mini/PencilSquareIcon.svelte';
	import TrashIcon from './heroicons/mini/TrashIcon.svelte';
	import Menu from './Menu.svelte';
	import RatingBadge from './RatingBadge.svelte';
	import Button from './ui/Button.svelte';
	import Checkbox from './ui/Checkbox.svelte';
	import EditDialog from './ui/EditDialog.svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		task: Task;
		showBadges?: boolean;
	}

	const { task, showBadges = false }: Props = $props();

	let editDialog = $state<EditDialog>();
	let complete = $state<boolean>(task.complete);
</script>

<li class="flex items-center gap-3 py-3 pl-5 pr-3" transition:slide>
	{#if showBadges}
		<Checkbox
			id="taskCheckbox{task.id}"
			label={task.name}
			bind:checked={complete}
			size="lg"
			onchange={() => markTaskComplete(task.id, complete)}
		/>
	{/if}
	<div class="grow">{task.name}</div>
	{#if showBadges}
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
				label: 'Delete task',
				Icon: TrashIcon,
				onSelect: () => deleteTask(task.id)
			}
		]}
		class="flex items-center p-1"
	>
		{#snippet button(props)}
			<Button size="xl" variant="text" Icon={EllipsisVerticalIcon} {...props} />
		{/snippet}
	</Menu>
</li>

<EditDialog bind:this={editDialog} label="Task" submit={(value) => editTaskName(task.id, value)} />
