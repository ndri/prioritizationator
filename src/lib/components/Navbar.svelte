<script lang="ts">
	import { Bars3Icon, XMarkIcon } from '@sidekickicons/svelte/24/outline';
	import SidebarContents from './SidebarContents.svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from './ui/Button.svelte';

	let sidebarOpen = $state(false);
	let sidebarElement = $state<HTMLElement | null>(null);
</script>

<header
	class="bg-main-50 dark:bg-main-900 fixed top-0 z-30 flex w-full justify-center p-4 lg:hidden"
>
	<div class="flex w-full max-w-3xl items-center gap-3">
		<Button
			size="xl"
			variant="text"
			Icon={sidebarOpen ? XMarkIcon : Bars3Icon}
			onclick={() => (sidebarOpen = !sidebarOpen)}
			class="p-1"
			aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
		/>
		<h1 class="grow text-xl font-medium">Prioritizationator</h1>
	</div>
</header>

<aside class={['h-screen pt-4 pl-4', 'hidden lg:flex']}>
	<SidebarContents onclick={() => (sidebarOpen = false)} />
</aside>

{#if sidebarOpen}
	<button
		class="bg-main-500/75 dark:bg-main-950/85 fixed inset-0 z-10 cursor-default transition-opacity lg:hidden"
		aria-hidden="true"
		aria-label="Close sidebar"
		onclick={() => (sidebarOpen = false)}
		transition:fade={{ duration: 150 }}
		tabindex="-1"
	></button>
	<aside
		class={[
			'fixed left-0 z-20 h-screen px-4 pt-[68px]',
			'bg-main-50 dark:bg-main-900',
			'lg:hidden'
		]}
		transition:fly={{ x: -(sidebarElement?.clientWidth ?? 0), opacity: 1, duration: 150 }}
		bind:this={sidebarElement}
	>
		<SidebarContents onclick={() => (sidebarOpen = false)} hideTitle />
	</aside>
{/if}
