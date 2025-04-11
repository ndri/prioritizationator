<script lang="ts">
	import { type TaskWithBlockings } from '../db';
	import TaskList from './TaskList.svelte';

	interface Props {
		blockedTasks: TaskWithBlockings[];
	}

	const { blockedTasks }: Props = $props();
</script>

<div class="flex flex-col">
	<TaskList
		title="Blocked Tasks"
		description="These tasks are blocked by other tasks. Complete the blocking tasks or mark them as unblocked to be able to prioritize them."
		tasks={blockedTasks}
		showBadges
	/>
</div>
