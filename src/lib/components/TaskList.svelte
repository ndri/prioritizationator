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
			class={[
				'flex flex-col divide-y divide-solid rounded-xl',
				'divide-slate-200 bg-slate-50',
				'dark:divide-slate-950 dark:bg-slate-900'
			]}
		>
			{#each tasks as task (task.id)}
				<TaskCard {task} {showBadges} />
			{/each}
		</ol>
	</section>
{/if}
