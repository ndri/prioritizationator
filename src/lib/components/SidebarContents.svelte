<script lang="ts">
	import { page } from '$app/state';
	import { getRecentProjects } from '$lib/db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import CircleStackIcon from './heroicons/mini/CircleStackIcon.svelte';
	import DocumentTextIcon from './heroicons/mini/DocumentTextIcon.svelte';
	import HomeIcon from './heroicons/mini/HomeIcon.svelte';
	import QuestionMarkCircleIcon from './heroicons/mini/QuestionMarkCircleIcon.svelte';
	import SidebarItem from './SidebarItem.svelte';

	interface Props {
		hideTitle?: boolean;
		onclick?: () => void;
	}

	const { hideTitle, onclick }: Props = $props();

	const currentPath = $derived(page.url.pathname);

	const menuItems = [
		{
			text: 'Projects',
			href: '/',
			Icon: HomeIcon
		},
		{
			text: 'Data',
			href: '/data',
			Icon: CircleStackIcon
		},
		{
			text: 'Help',
			href: '/help',
			Icon: QuestionMarkCircleIcon
		}
	];

	const recentProjectsQuery = stateQuery(() => getRecentProjects(5));
	const recentProjects = $derived(recentProjectsQuery.current);
</script>

<div class="flex h-full min-w-64 flex-col gap-2">
	{#if !hideTitle}
		<div class="flex items-center gap-3 px-4 pt-4">
			<img src="/logo.svg" alt="Prioritizationator logo" class="h-5 w-5" />
			<h1 class="text-xl font-medium">Prioritizationator</h1>
		</div>
	{/if}
	<nav class="flex flex-col gap-1.5 p-2">
		{#each menuItems as menuItem}
			<SidebarItem {...menuItem} active={currentPath === menuItem.href} {onclick} />
		{/each}
	</nav>
	{#if recentProjects}
		<div class="text-main-500 dark:text-main-400 p-2 pb-1 pl-4 text-sm font-medium">
			Recent projects
		</div>
		<nav class="flex flex-col gap-1.5 overflow-y-auto p-2 pt-1 *:shrink-0" tabindex="-1">
			{#each recentProjects as project (project.id)}
				<SidebarItem
					href={`/projects/${project.id}`}
					text={project.name}
					Icon={DocumentTextIcon}
					active={currentPath.startsWith(`/projects/${project.id}`)}
					{onclick}
				/>
			{/each}
		</nav>
	{/if}
</div>
