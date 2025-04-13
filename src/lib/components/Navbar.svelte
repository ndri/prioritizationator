<script lang="ts">
	import SidebarItem from './SidebarItem.svelte';
	import { page } from '$app/state';
	import CircleStackIcon from './heroicons/mini/CircleStackIcon.svelte';
	import HomeIcon from './heroicons/mini/HomeIcon.svelte';
	import QuestionMarkCircleIcon from './heroicons/mini/QuestionMarkCircleIcon.svelte';
	import Menu from './Menu.svelte';
	import EllipsisVerticalIcon from './heroicons/mini/EllipsisVerticalIcon.svelte';
	import Button from './ui/Button.svelte';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { getRecentProjects } from '$lib/db';
	import DocumentTextIcon from './heroicons/mini/DocumentTextIcon.svelte';

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

<header
	class="fixed top-0 z-10 flex w-full justify-between bg-slate-50 p-4 lg:hidden dark:bg-slate-900"
>
	<h1 class="text-xl font-medium">Prioritizationator</h1>
	<Menu
		items={menuItems.map((menuItem) => ({
			label: menuItem.text,
			Icon: menuItem.Icon,
			href: menuItem.href
		}))}
		class="flex items-center p-1"
	>
		{#snippet button(props)}
			<Button size="xl" variant="text" Icon={EllipsisVerticalIcon} {...props} />
		{/snippet}
	</Menu>
</header>

<aside class="hidden h-screen min-w-64 flex-col gap-2 pl-4 pt-4 lg:flex">
	<h1 class="p-2 text-xl font-medium">Prioritizationator</h1>
	<nav class="flex flex-col gap-1.5 p-2">
		{#each menuItems as menuItem}
			<SidebarItem {...menuItem} active={currentPath === menuItem.href} />
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
				/>
			{/each}
		</nav>
	{/if}
</aside>
