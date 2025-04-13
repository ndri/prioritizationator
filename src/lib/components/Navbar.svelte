<script lang="ts">
	import SidebarItem from './SidebarItem.svelte';
	import { page } from '$app/state';
	import CircleStackIcon from './heroicons/mini/CircleStackIcon.svelte';
	import HomeIcon from './heroicons/mini/HomeIcon.svelte';
	import QuestionMarkCircleIcon from './heroicons/mini/QuestionMarkCircleIcon.svelte';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getRecentProjects } from '$lib/db';
	import DocumentTextIcon from './heroicons/mini/DocumentTextIcon.svelte';
	import XMarkIcon from './heroicons/outline/XMarkIcon.svelte';
	import Bars3Icon from './heroicons/outline/Bars3Icon.svelte';

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

	let sidebarOpen = $state(false);
</script>

<header
	class="fixed top-0 z-20 flex w-full justify-center bg-slate-50 p-4 lg:hidden dark:bg-slate-900"
>
	<div class="flex w-full max-w-3xl items-center gap-3">
		<button
			onclick={() => (sidebarOpen = !sidebarOpen)}
			class={[
				'rounded-md p-1',
				'text-slate-400 hover:bg-slate-200 hover:text-slate-500',
				'dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-400'
			]}
		>
			{#if sidebarOpen}
				<XMarkIcon />
			{:else}
				<Bars3Icon />
			{/if}
		</button>
		<div class="grow text-xl font-medium">Prioritizationator</div>
	</div>
</header>

<aside
	class={[
		'z-10 flex h-screen min-w-64 flex-col gap-2',
		'fixed left-0 top-0',
		'lg:static lg:left-auto lg:top-auto',
		'p-2',
		'lg:p-0 lg:pl-4 lg:pt-4',
		'bg-slate-50 lg:bg-auto dark:bg-slate-900 dark:lg:bg-auto',
		'transition-transform duration-300 ease-in-out',
		sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
	]}
>
	<div class="flex px-2 py-4">
		<h1 class="text-xl font-medium">Prioritizationator</h1>
	</div>
	<nav class="flex flex-col gap-1.5 p-2">
		{#each menuItems as menuItem}
			<SidebarItem
				{...menuItem}
				active={currentPath === menuItem.href}
				onclick={() => (sidebarOpen = false)}
			/>
		{/each}
	</nav>
	{#if recentProjects}
		<div class="p-2 pl-4 text-sm font-medium text-slate-500 dark:text-slate-400">
			Recent projects
		</div>
		<nav class=" flex flex-col gap-1.5 overflow-y-auto p-2 pt-0 [&>*]:shrink-0">
			{#each recentProjects as project (project.id)}
				<SidebarItem
					href={`/projects/${project.id}`}
					text={project.name}
					Icon={DocumentTextIcon}
					active={currentPath.startsWith(`/projects/${project.id}`)}
					onclick={() => (sidebarOpen = false)}
				/>
			{/each}
		</nav>
	{/if}
</aside>
