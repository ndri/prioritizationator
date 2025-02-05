<script lang="ts">
	import {
		filterLeaps,
		filterLowHangingFruits,
		filterQuickWins,
		filterRatedTasks,
		filterTraps,
		filterUnratedTasks,
		sortTasks
	} from '$lib/utils';
	import { type Task } from '../db';
	import PrioritizationMatrix from './PrioritizationMatrix.svelte';
	import TaskCard from './TaskCard.svelte';

	interface Props {
		tasks?: Task[];
	}

	const { tasks }: Props = $props();

	const sortedTasks = $derived(sortTasks(tasks ?? []));
	const unratedTasks = $derived(filterUnratedTasks(sortedTasks ?? []));
	const ratedTasks = $derived(filterRatedTasks(sortedTasks ?? []));
	const lowHangingFruits = $derived(filterLowHangingFruits(ratedTasks ?? []));
	const traps = $derived(filterTraps(ratedTasks ?? []));
	const quickWins = $derived(filterQuickWins(ratedTasks ?? []));
	const leaps = $derived(filterLeaps(ratedTasks ?? []));
</script>

{#if tasks?.length === 0}
	<p class="text-left text-slate-500 dark:text-slate-400">No tasks yet. Add some to get started!</p>
{:else}
	<PrioritizationMatrix tasks={tasks ?? []} />
{/if}

{#snippet tasksSection(title: string, description: string, tasks: Task[] | undefined)}
	{#if tasks?.length}
		<section>
			<h2 class="mb-4 text-xl font-medium">{title}</h2>
			<p class="mb-4 text-slate-500 dark:text-slate-400">{description}</p>
			<ol
				class="flex flex-col divide-y divide-solid divide-slate-200 rounded-xl bg-slate-100 dark:divide-slate-900 dark:bg-slate-800"
			>
				{#each tasks as task}
					<TaskCard {task} />
				{/each}
			</ol>
		</section>
	{/if}
{/snippet}

{@render tasksSection('Low Hanging Fruits', 'Do these first!', lowHangingFruits)}
{@render tasksSection(
	'Quick Wins',
	'Do these only if you run out of Low Hanging Fruits.',
	quickWins
)}
{@render tasksSection(
	'Leaps',
	"Do these only if you run out of Low Hanging Fruits and you're confident that they're valuable. Consider splitting them up to create multiple lower-effort tasks.",
	leaps
)}
{@render tasksSection('Traps', 'Consider dropping these.', traps)}
{@render tasksSection('Unrated Tasks', 'Rate them above to prioritize them!', unratedTasks)}
