<script lang="ts">
	import {
		canRedoMatchup,
		canUndoMatchup,
		getProject,
		recordEaseMatchupDraw,
		recordEaseMatchupWin,
		recordValueMatchupDraw,
		recordValueMatchupWin,
		redoMatchup,
		undoMatchup
	} from '$lib/db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import {
		easeRatingsProgress,
		filterIncompleteTasks,
		minTasksForRating,
		ratingsRequired,
		tasksReadyForRating,
		valueRatingsProgress
	} from '$lib/utils/tasks';
	import { createTitle } from '$lib/utils/title';
	import ArrowLeftIcon from './heroicons/mini/ArrowLeftIcon.svelte';
	import ArrowUturnLeftIcon from './heroicons/mini/ArrowUturnLeftIcon.svelte';
	import ArrowUturnRightIcon from './heroicons/mini/ArrowUturnRightIcon.svelte';
	import CheckIcon from './heroicons/mini/CheckIcon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import TaskPairing from './TaskPairing.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		projectId: number;
		dimension: 'value' | 'ease';
		intro?: boolean;
	}

	const { projectId, dimension, intro = false }: Props = $props();

	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);

	const canUndoQuery = stateQuery(() => canUndoMatchup(projectId, dimension));
	const canUndo = $derived(canUndoQuery.current);

	const canRedoQuery = stateQuery(() => canRedoMatchup(projectId, dimension));
	const canRedo = $derived(canRedoQuery.current);

	let taskPairing = $state<TaskPairing>();
</script>

<svelte:head><title>{createTitle(project?.name)}</title></svelte:head>

{#if project}
	<h1 class="sr-only text-3xl font-bold">{project.name} value rating</h1>

	{#if tasksReadyForRating(project.tasks)}
		{@const incompleteTasks = filterIncompleteTasks(project.tasks)}
		{@const progress =
			dimension === 'value'
				? valueRatingsProgress(incompleteTasks)
				: easeRatingsProgress(incompleteTasks)}
		{@const total = ratingsRequired(incompleteTasks)}

		<div class="flex flex-col gap-3">
			<h2 class="text-center text-xl font-medium">
				{#if dimension === 'value'}
					Which task provides <span class="text-accent-600 dark:text-accent-500">more value</span>
					in your project?
				{:else if dimension === 'ease'}
					Which task requires <span class="text-accent-600 dark:text-accent-500">less effort</span>
					to complete?
				{/if}
			</h2>

			<p class="text-main-500 dark:text-main-400 text-center text-sm">
				{#if dimension === 'value'}
					Think about how much they contribute to the main goal of your project.
				{:else if dimension === 'ease'}
					Think about the time, energy, and resources required.
				{/if}
			</p>
		</div>

		<TaskPairing
			{projectId}
			{dimension}
			recordWin={dimension === 'value' ? recordValueMatchupWin : recordEaseMatchupWin}
			recordDraw={dimension === 'value' ? recordValueMatchupDraw : recordEaseMatchupDraw}
			bind:this={taskPairing}
		/>

		<ProgressBar {progress} {total} animateOnComplete />

		<div class="flex justify-between gap-2">
			<div class="flex gap-2">
				<Button
					variant="secondary"
					Icon={ArrowUturnLeftIcon}
					onclick={async () => {
						await undoMatchup(projectId, dimension);
						taskPairing?.resetTasks();
					}}
					disabled={!canUndo}
				>
					Undo
				</Button>
				<Button
					variant="secondary"
					Icon={ArrowUturnRightIcon}
					onclick={async () => {
						await redoMatchup(projectId, dimension);
						taskPairing?.resetTasks();
					}}
					disabled={!canRedo}
				>
					Redo
				</Button>
			</div>
			<div class="flex gap-2">
				{#if intro}
					{@const previousUrl =
						dimension === 'value'
							? `/projects/${projectId}/intro/2`
							: `/projects/${projectId}/intro/4`}
					<Button href={previousUrl} variant="secondary" Icon={ArrowLeftIcon}>Back</Button>
					{@const nextUrl =
						dimension === 'value'
							? `/projects/${projectId}/intro/4`
							: `/projects/${projectId}/intro/6`}
					<Button href={nextUrl} disabled={progress < total} Icon={CheckIcon}>Continue</Button>
				{:else}
					<Button href={`/projects/${projectId}`} variant="secondary" Icon={ArrowLeftIcon}>
						Back to project
					</Button>
					{@const nextUrl =
						dimension === 'value' ? `/projects/${projectId}/ease` : `/projects/${projectId}`}
					<Button href={nextUrl} disabled={progress < total} Icon={CheckIcon}>
						{dimension === 'value' ? 'Rate effort' : 'Finish rating'}
					</Button>
				{/if}
			</div>
		</div>
	{:else}
		<p class="text-main-500 dark:text-main-400">
			You need at least {minTasksForRating} incomplete tasks to rate them.
		</p>
		<div class="flex"><Button href={`/projects/${projectId}`}>Return to project</Button></div>
	{/if}
{/if}
