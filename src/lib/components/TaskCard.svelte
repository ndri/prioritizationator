<script lang="ts">
	import { deleteTask, type Task } from '$lib/db';
	import { taskEaseIsRated, taskValueIsRated } from '$lib/utils/tasks';
	import EllipsisVerticalIcon from './heroicons/mini/EllipsisVerticalIcon.svelte';
	import TrashIcon from './heroicons/mini/TrashIcon.svelte';
	import Menu from './Menu.svelte';
	import ScoreBadge from './ScoreBadge.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		task: Task;
		showBadges?: boolean;
	}

	const { task, showBadges = false }: Props = $props();
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
				label: 'Delete',
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
