<script lang="ts">
	import { deleteTask, type Task } from '../db';
	import EllipsisVerticalIcon from './heroicons/mini/EllipsisVerticalIcon.svelte';
	import TrashIcon from './heroicons/mini/TrashIcon.svelte';
	import Menu from './Menu.svelte';
	import ScoreBadge from './ScoreBadge.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		tasks?: Task[];
	}

	const { tasks }: Props = $props();

	const sortedTasks = $derived(
		tasks?.toSorted((a, b) => {
			const aScore = (a.valueScore ?? 1) * (a.easeScore ?? 1);
			const bScore = (b.valueScore ?? 1) * (b.easeScore ?? 1);
			return bScore - aScore;
		})
	);
</script>

{#if sortedTasks?.length}
	<section>
		<h2 class="mb-4 text-xl font-medium">Tasks</h2>
		<ol
			class="flex flex-col divide-y divide-solid divide-slate-200 rounded-xl bg-slate-100 dark:divide-slate-900 dark:bg-slate-800"
		>
			{#each sortedTasks as task}
				<li class="flex items-center gap-2 py-3 pl-5 pr-3">
					<div class="grow">{task.name}</div>
					<ScoreBadge label="Value" score={task.valueScore ?? -1} />
					<ScoreBadge label="Ease" score={task.easeScore ?? -1} />
					<Menu
						items={[
							{
								label: 'Delete',
								Icon: TrashIcon,
								onSelect: () => deleteTask(task.id)
							}
						]}
					>
						{#snippet button(props)}
							<Button
								size="xs"
								variant="text"
								class="text-slate-400 dark:text-slate-500"
								{...props}
							>
								{#snippet icon(className)}
									<EllipsisVerticalIcon {className} />
								{/snippet}
							</Button>
						{/snippet}
					</Menu>
				</li>
			{/each}
		</ol>
	</section>
{/if}
