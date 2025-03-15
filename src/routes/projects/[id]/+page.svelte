<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import NewTaskForm from '$lib/components/NewTaskForm.svelte';
	import OrganizedTaskLists from '$lib/components/OrganizedTaskLists.svelte';
	import { deleteProject, editProjectName, getProject, resetRatings } from '$lib/db';
	import type { PageProps } from './$types';
	import {
		easeRatingsProgress,
		filterIncompleteTasks,
		filterRatedTasks,
		minTasksForRating,
		ratingsRequired,
		tasksReadyForRating,
		valueRatingsProgress
	} from '$lib/utils/tasks';
	import PrioritizationMatrix from '$lib/components/PrioritizationMatrix.svelte';
	import RankingCard from '$lib/components/RankingCard.svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import TrashIcon from '$lib/components/heroicons/mini/TrashIcon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import EllipsisVerticalIcon from '$lib/components/heroicons/mini/EllipsisVerticalIcon.svelte';
	import { goto } from '$app/navigation';
	import SimpleDialog from '$lib/components/ui/SimpleDialog.svelte';
	import PencilSquareIcon from '$lib/components/heroicons/mini/PencilSquareIcon.svelte';
	import EditDialog from '$lib/components/ui/EditDialog.svelte';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);

	let deleteDialog = $state<SimpleDialog>();
	let editDialog = $state<EditDialog>();
</script>

<BackLink href="/" text="Back to projects" />

{#if project}
	<div class="flex justify-between">
		<h1 class="text-3xl font-bold">{project.name}</h1>
		<Menu
			items={[
				{
					label: 'Edit project name',
					Icon: PencilSquareIcon,
					onSelect: () => {
						if (editDialog) {
							editDialog.setValue(project.name);
							editDialog.open();
						}
					}
				},
				{
					label: 'Delete project',
					Icon: TrashIcon,
					onSelect: () => deleteDialog?.open()
				}
			]}
			class="flex items-center p-1"
		>
			{#snippet button(props)}
				<Button size="xl" variant="text" Icon={EllipsisVerticalIcon} {...props} />
			{/snippet}
		</Menu>
	</div>

	{#if project.tasks}
		{#if tasksReadyForRating(project.tasks)}
			{@const incompleteTasks = filterIncompleteTasks(project.tasks)}
			<div class="grid grid-cols-2 gap-4">
				<RankingCard
					title="Value"
					ratingsProgress={valueRatingsProgress(incompleteTasks)}
					ratingsRequired={ratingsRequired(incompleteTasks)}
					rankingPath="/projects/{projectId}/value"
				/>
				<RankingCard
					title="Ease"
					ratingsProgress={easeRatingsProgress(incompleteTasks)}
					ratingsRequired={ratingsRequired(incompleteTasks)}
					rankingPath="/projects/{projectId}/ease"
				/>
			</div>
			<!-- <Button onclick={() => resetRatings(projectId)} variant="secondary" size="sm">
			Reset ratings
		</Button> -->
		{:else}
			<p class="text-slate-500 dark:text-slate-400">
				You need at least {minTasksForRating} incomplete tasks to rate them.
			</p>
		{/if}

		{#if filterRatedTasks(project.tasks).length}
			<PrioritizationMatrix tasks={project.tasks} />
		{/if}
	{/if}

	<OrganizedTaskLists tasks={project.tasks} />
	<NewTaskForm {projectId} />

	<SimpleDialog
		bind:this={deleteDialog}
		title="Delete project"
		description="Are you sure you want to delete this project? This action cannot be undone."
		buttons={[
			{
				label: 'Delete',
				variant: 'primary',
				onclick: () => {
					deleteProject(projectId);
					goto('/');
					deleteDialog?.close();
				}
			},
			{
				label: 'Cancel',
				variant: 'secondary',
				onclick: () => deleteDialog?.close()
			}
		]}
	/>

	<EditDialog
		bind:this={editDialog}
		label="Project name"
		submit={(value) => editProjectName(projectId, value)}
	/>
{/if}
