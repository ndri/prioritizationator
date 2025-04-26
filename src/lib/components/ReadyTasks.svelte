<script lang="ts">
	import {
		filterLeaps,
		filterLowHangingFruits,
		filterQuickWins,
		filterRatedTasks,
		filterTraps,
		filterUnratedTasks
	} from '$lib/utils/tasks';
	import { type TaskWithBlockings } from '../db';
	import TaskList from './TaskList.svelte';

	interface Props {
		unblockedTasks?: TaskWithBlockings[];
	}

	const { unblockedTasks = [] }: Props = $props();

	const unratedTasks = $derived(filterUnratedTasks(unblockedTasks));
	const ratedTasks = $derived(filterRatedTasks(unblockedTasks));

	const lowHangingFruits = $derived(filterLowHangingFruits(ratedTasks));
	const traps = $derived(filterTraps(ratedTasks));
	const quickWins = $derived(filterQuickWins(ratedTasks));
	const leaps = $derived(filterLeaps(ratedTasks));
</script>

<div class="flex flex-col gap-6">
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
	<TaskList
		title="Traps"
		description="Consider dropping these if possible."
		tasks={traps}
		showBadges
	/>
	<TaskList
		title="Unrated Tasks"
		description="Rate them above to prioritize them!"
		tasks={unratedTasks}
		showBadges
	/>
</div>
