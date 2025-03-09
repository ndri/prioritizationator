<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import NewTaskForm from '$lib/components/NewTaskForm.svelte';
	import OrganizedTaskLists from '$lib/components/OrganizedTaskLists.svelte';
	import { deleteProject, getProject, resetRatings } from '$lib/db';
	import type { PageProps } from './$types';
	import {
		easeRatingsProgress,
		filterRatedTasks,
		ratingsRequired,
		valueRatingsProgress
	} from '$lib/utils/tasks';
	import PrioritizationMatrix from '$lib/components/PrioritizationMatrix.svelte';
	import RankingCard from '$lib/components/RankingCard.svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import TrashIcon from '$lib/components/heroicons/mini/TrashIcon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import EllipsisVerticalIcon from '$lib/components/heroicons/mini/EllipsisVerticalIcon.svelte';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => getProject(projectId));
	const project = $derived(projectQuery.current);
</script>

<BackLink href="/" text="Back to projects" />

<div class="flex justify-between">
	<h1 class="text-3xl font-bold">{project?.name}</h1>
	<Menu
		items={[
			{
				label: 'Delete project',
				Icon: TrashIcon,
				onSelect: () => deleteProject(projectId)
			}
		]}
		class="flex items-center p-1"
	>
		{#snippet button(props)}
			<Button size="xl" variant="text" Icon={EllipsisVerticalIcon} {...props} />
		{/snippet}
	</Menu>
</div>

{#if project?.tasks?.length}
	<div class="grid grid-cols-2 gap-4">
		<RankingCard
			title="Value"
			ratingsProgress={valueRatingsProgress(project.tasks)}
			ratingsRequired={ratingsRequired(project.tasks)}
			rankingPath="/projects/{projectId}/value"
		/>
		<RankingCard
			title="Ease"
			ratingsProgress={easeRatingsProgress(project.tasks)}
			ratingsRequired={ratingsRequired(project.tasks)}
			rankingPath="/projects/{projectId}/ease"
		/>
	</div>
	<!-- <Button onclick={() => resetRatings(projectId)} variant="secondary" size="sm">
		Reset ratings
	</Button> -->
{/if}

{#if filterRatedTasks(project?.tasks ?? []).length}
	<PrioritizationMatrix tasks={project?.tasks ?? []} />
{/if}

<OrganizedTaskLists tasks={project?.tasks} />
<NewTaskForm {projectId} />
