<script lang="ts">
	import '@fontsource-variable/inter';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { createTitle } from '$lib/utils/title';
	let { children } = $props();

	export const ssr = false;
</script>

<svelte:head><title>{createTitle()}</title></svelte:head>

<div
	class={[
		'relative flex min-h-full flex-col items-center justify-start p-0',
		'md:justify-center',
		'lg:flex-row lg:items-start',
		'text-main-800 lg:bg-main-50 bg-white ',
		'dark:text-main-200 dark:bg-main-900'
	]}
>
	<Navbar />
	<main class={['flex h-screen w-full flex-col overflow-y-auto p-0', 'lg:p-4']} tabindex="-1">
		<div
			class={[
				'@container',
				'flex justify-center p-4 pt-24',
				'border-main-200 bg-white',
				'dark:bg-main-950 dark:border-main-800',
				'lg:rounded-lg lg:border lg:p-16'
			]}
		>
			<div class="flex w-full max-w-3xl flex-col gap-8">{@render children()}</div>
		</div>
	</main>
</div>
