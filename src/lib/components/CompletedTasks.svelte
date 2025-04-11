<script lang="ts">
	import { sortTasksByCompletedAt } from '$lib/utils/tasks';
	import { type TaskWithBlockings } from '../db';
	import TaskList from './TaskList.svelte';

	interface Props {
		completedTasks?: TaskWithBlockings[];
	}

	const { completedTasks = [] }: Props = $props();

	const sortedCompletedTasks = $derived(sortTasksByCompletedAt(completedTasks));
</script>

<div class="flex flex-col">
	<TaskList
		title="Completed Tasks"
		description="Well done!"
		tasks={sortedCompletedTasks}
		showBadges
	/>
</div>
