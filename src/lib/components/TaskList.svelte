<script lang="ts">
	import type { Task } from '$lib/db';
	import TaskCard from './TaskCard.svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		title?: string;
		description?: string;
		tasks: Task[];
		showBadges?: boolean;
	}

	const { title, description, tasks, showBadges = false }: Props = $props();
</script>

{#if tasks.length}
	<section class="flex flex-col gap-4" transition:slide>
		{#if title}<h2 class="font-medium">{title}</h2>{/if}
		{#if description}<p class="text-main-500 dark:text-main-400 text-sm">{description}</p>{/if}
		<ol
			class={[
				'flex flex-col divide-y divide-solid rounded-xl',
				'bg-main-50 divide-main-200',
				'dark:bg-main-900 dark:divide-main-950'
			]}
		>
			{#each tasks as task (task.id)}
				<TaskCard {task} {showBadges} />
			{/each}
		</ol>
	</section>
{/if}
