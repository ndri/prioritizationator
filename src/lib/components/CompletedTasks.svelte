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
		description="These are the tasks you have completed so far. They can no longer be prioritized and the tasks they are blocking are no longer blocked."
		tasks={sortedCompletedTasks}
		showBadges
	/>
</div>
