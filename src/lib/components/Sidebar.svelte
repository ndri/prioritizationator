<script lang="ts">
	import CircleStackIcon from './heroicons/mini/CircleStackIcon.svelte';
	import HomeIcon from './heroicons/mini/HomeIcon.svelte';
	import QuestionMarkCircleIcon from './heroicons/mini/QuestionMarkCircleIcon.svelte';
	import SidebarItem from './SidebarItem.svelte';
	import { page } from '$app/state';

	const currentPath = $derived(page.url.pathname);
</script>

<aside class="sticky top-0 flex min-w-64 flex-col gap-6 px-4 py-8">
	<h1 class="text-xl font-semibold">Prioritizationator</h1>
	<nav class="flex flex-col gap-2">
		<SidebarItem href="/" text="Projects" active={currentPath === '/'}>
			{#snippet icon()}
				<HomeIcon />
			{/snippet}
		</SidebarItem>
		<SidebarItem href="/data" text="Data" active={currentPath === '/data'}>
			{#snippet icon()}
				<CircleStackIcon />
			{/snippet}
		</SidebarItem>
		<SidebarItem href="/faq" text="FAQ" active={currentPath === '/faq'}>
			{#snippet icon()}
				<QuestionMarkCircleIcon />
			{/snippet}
		</SidebarItem>
	</nav>
</aside>
