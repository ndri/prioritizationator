<script lang="ts">
	import {
		filterBlockedTasks,
		filterCompletedTasks,
		filterIncompleteTasks,
		filterLeaps,
		filterLowHangingFruits,
		filterQuickWins,
		filterRatedTasks,
		filterTraps,
		filterUnblockedTasks,
		filterUnratedTasks,
		sortTasksByCompletedAt,
		sortTasksByRating
	} from '$lib/utils/tasks';
	import { type TaskWithBlockings } from '../db';
	import TaskList from './TaskList.svelte';
	import Tabs from './ui/Tabs.svelte';

	interface Props {
		tasks?: TaskWithBlockings[];
	}

	const { tasks = [] }: Props = $props();

	let tab = $state<'ready' | 'blocked' | 'completed'>('ready');

	const incompleteTasks = $derived(filterIncompleteTasks(tasks));
	const sortedIncompleteTasks = $derived(sortTasksByRating(incompleteTasks));
	const blockedTasks = $derived(filterBlockedTasks(sortedIncompleteTasks));

	const unblockedTasks = $derived(filterUnblockedTasks(sortedIncompleteTasks));
	const unratedTasks = $derived(filterUnratedTasks(unblockedTasks));
	const ratedTasks = $derived(filterRatedTasks(unblockedTasks));

	const lowHangingFruits = $derived(filterLowHangingFruits(ratedTasks));
	const traps = $derived(filterTraps(ratedTasks));
	const quickWins = $derived(filterQuickWins(ratedTasks));
	const leaps = $derived(filterLeaps(ratedTasks));

	const completedTasks = $derived(filterCompletedTasks(tasks));
	const sortedCompletedTasks = $derived(sortTasksByCompletedAt(completedTasks));
</script>

<Tabs
	values={[
		{ id: 'ready', label: 'Ready' },
		{ id: 'blocked', label: 'Blocked' },
		{ id: 'completed', label: 'Completed' }
	]}
	bind:selected={tab}
/>

<div class="flex flex-col">
	{#if tab === 'ready'}
		<TaskList
			title="Low Hanging Fruits"
			description="Do these first!"
			tasks={lowHangingFruits}
			showBadges
		/>
		<TaskList
			title="Quick Wins"
			description="Do these only if you run out of Low Hanging Fruits."
			tasks={quickWins}
			showBadges
		/>
		<TaskList
			title="Leaps"
			description="Do these only if you run out of Low Hanging Fruits and you're confident that they're valuable. Consider splitting them up to create multiple lower-effort tasks."
			tasks={leaps}
			showBadges
		/>
		<TaskList title="Traps" description="Consider dropping these." tasks={traps} showBadges />
		<TaskList
			title="Unrated Tasks"
			description="Rate them above to prioritize them!"
			tasks={unratedTasks}
			showBadges
		/>
	{:else if tab === 'blocked'}
		<TaskList
			title="Blocked Tasks"
			description="These tasks are blocked by other tasks. Complete the blocking tasks to prioritize them."
			tasks={blockedTasks}
			showBadges
		/>
	{:else if tab === 'completed'}
		<TaskList
			title="Completed Tasks"
			description="Well done!"
			tasks={sortedCompletedTasks}
			showBadges
		/>
	{/if}
</div>
