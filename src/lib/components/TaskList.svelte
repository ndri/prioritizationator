<script lang="ts">
	import type { Task } from '$lib/db';
	import TaskCard from './TaskCard.svelte';

	interface Props {
		title?: string;
		description?: string;
		tasks: Task[];
		showBadges?: boolean;
	}

	const { title, description, tasks, showBadges = false }: Props = $props();
</script>

{#if tasks.length}
	<section class="flex flex-col gap-4">
		{#if title}<h2 class="text-xl font-medium">{title}</h2>{/if}
		{#if description}<p class="text-slate-500 dark:text-slate-400">{description}</p>{/if}
		<ol
			class="flex flex-col divide-y divide-solid divide-slate-200 rounded-xl bg-slate-100 dark:divide-slate-900 dark:bg-slate-800"
		>
			{#each tasks as task}
				<TaskCard {task} {showBadges} />
			{/each}
		</ol>
	</section>
{/if}
