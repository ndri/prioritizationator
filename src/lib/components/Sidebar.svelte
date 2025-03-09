<script lang="ts">
	import SidebarItem from './SidebarItem.svelte';
	import { page } from '$app/state';
	import CircleStackIcon from './heroicons/mini/CircleStackIcon.svelte';
	import HomeIcon from './heroicons/mini/HomeIcon.svelte';
	import QuestionMarkCircleIcon from './heroicons/mini/QuestionMarkCircleIcon.svelte';

	const currentPath = $derived(page.url.pathname);
</script>

<aside class="sticky top-0 flex min-w-64 flex-col gap-6 px-4 py-8">
	<h1 class="text-xl font-semibold">Prioritizationator</h1>
	<nav class="flex flex-col gap-2">
		<SidebarItem href="/" text="Projects" Icon={HomeIcon} active={currentPath === '/'} />
		<SidebarItem href="/data" text="Data" Icon={CircleStackIcon} active={currentPath === '/data'} />
		<SidebarItem
			href="/faq"
			text="FAQ"
			Icon={QuestionMarkCircleIcon}
			active={currentPath === '/faq'}
		/>
	</nav>
</aside>
