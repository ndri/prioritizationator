<script lang="ts">
	import { deleteTask, editTaskName, type Task } from '$lib/db';
	import { taskEaseIsRated, taskValueIsRated } from '$lib/utils/tasks';
	import EllipsisVerticalIcon from './heroicons/mini/EllipsisVerticalIcon.svelte';
	import PencilSquareIcon from './heroicons/mini/PencilSquareIcon.svelte';
	import TrashIcon from './heroicons/mini/TrashIcon.svelte';
	import Menu from './Menu.svelte';
	import ScoreBadge from './ScoreBadge.svelte';
	import Button from './ui/Button.svelte';
	import EditDialog from './ui/EditDialog.svelte';

	interface Props {
		task: Task;
		showBadges?: boolean;
	}

	const { task, showBadges = false }: Props = $props();

	let editDialog = $state<EditDialog>();
</script>

<li class="flex items-center gap-2 py-3 pl-5 pr-3">
	<div class="grow">{task.name}</div>
	{#if showBadges}
		<ScoreBadge label="Value" score={task.valueScore ?? -1} rated={taskValueIsRated(task)} />
		<ScoreBadge label="Ease" score={task.easeScore ?? -1} rated={taskEaseIsRated(task)} />
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
