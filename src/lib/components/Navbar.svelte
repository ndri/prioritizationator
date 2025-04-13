<script lang="ts">
	import XMarkIcon from './heroicons/outline/XMarkIcon.svelte';
	import Bars3Icon from './heroicons/outline/Bars3Icon.svelte';
	import SidebarContents from './SidebarContents.svelte';
	import { fade, fly } from 'svelte/transition';

	let sidebarOpen = $state(false);
	let sidebarElement = $state<HTMLElement | null>(null);
</script>

<header
	class="fixed top-0 z-30 flex w-full justify-center bg-slate-50 p-4 lg:hidden dark:bg-slate-900"
>
	<div class="flex w-full max-w-3xl items-center gap-3">
		<button
			onclick={() => (sidebarOpen = !sidebarOpen)}
			class={[
				'rounded-md p-1',
				'text-slate-400 hover:bg-slate-200 hover:text-slate-500',
				'dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-400'
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

<aside class={['h-screen pl-4 pt-4', 'hidden lg:flex']}>
	<SidebarContents onclick={() => (sidebarOpen = false)} />
</aside>

{#if sidebarOpen}
	<button
		class="fixed inset-0 z-10 cursor-default bg-slate-500/75 transition-opacity lg:hidden dark:bg-slate-950/85"
		aria-hidden="true"
		aria-label="Close sidebar"
		onclick={() => (sidebarOpen = false)}
		transition:fade={{ duration: 150 }}
	></button>
	<aside
		class={[
			'fixed left-0 z-20 h-screen px-4 pt-[68px]',
			'bg-slate-50 dark:bg-slate-900',
			'lg:hidden'
		]}
		transition:fly={{ x: -(sidebarElement?.clientWidth ?? 0), opacity: 1, duration: 150 }}
		bind:this={sidebarElement}
	>
		<SidebarContents onclick={() => (sidebarOpen = false)} hideTitle />
	</aside>
{/if}
