<script lang="ts">
	import SidebarItem from './SidebarItem.svelte';
	import { page } from '$app/state';
	import CircleStackIcon from './heroicons/mini/CircleStackIcon.svelte';
	import HomeIcon from './heroicons/mini/HomeIcon.svelte';
	import QuestionMarkCircleIcon from './heroicons/mini/QuestionMarkCircleIcon.svelte';
	import Menu from './Menu.svelte';
	import EllipsisVerticalIcon from './heroicons/mini/EllipsisVerticalIcon.svelte';
	import Button from './ui/Button.svelte';

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
</script>

<header class="sticky top-0 z-10 flex w-full max-w-3xl justify-between bg-slate-900 p-6 lg:hidden">
	<h1 class="text-xl font-semibold">Prioritizationator</h1>
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

<aside class="sticky top-0 hidden min-w-56 flex-col gap-6 px-4 py-8 lg:flex">
	<h1 class="text-xl font-semibold">Prioritizationator</h1>
	<nav class="flex flex-col gap-2">
		{#each menuItems as menuItem}
			<SidebarItem {...menuItem} active={currentPath === menuItem.href} />
		{/each}
	</nav>
</aside>
