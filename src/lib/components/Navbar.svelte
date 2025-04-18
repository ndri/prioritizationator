<script lang="ts">
	import XMarkIcon from './heroicons/outline/XMarkIcon.svelte';
	import Bars3Icon from './heroicons/outline/Bars3Icon.svelte';
	import SidebarContents from './SidebarContents.svelte';
	import { fade, fly } from 'svelte/transition';

	let sidebarOpen = $state(false);
	let sidebarElement = $state<HTMLElement | null>(null);
</script>

<header
	class="bg-main-50 dark:bg-main-900 fixed top-0 z-30 flex w-full justify-center p-4 lg:hidden"
>
	<div class="flex w-full max-w-3xl items-center gap-3">
		<button
			onclick={() => (sidebarOpen = !sidebarOpen)}
			class={[
				'cursor-pointer rounded-md p-1',
				'text-main-400 hover:text-main-500 hover:bg-main-200',
				'dark:text-main-500 dark:hover:text-main-400 dark:hover:bg-main-800'
			]}
			aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
		>
			{#if sidebarOpen}
				<XMarkIcon />
			{:else}
				<Bars3Icon />
			{/if}
		</button>
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
