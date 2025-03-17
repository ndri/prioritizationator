<script lang="ts">
	import '@fontsource-variable/inter';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<div
	class={[
		'relative flex min-h-full flex-col items-center justify-start',
		'md:justify-center md:px-4 md:py-16',
		'lg:flex-row lg:items-start',
		'bg-slate-100 p-0 text-slate-900 dark:bg-slate-900 dark:text-slate-100'
	]}
>
	<Navbar />
	<main
		class={[
			'flex w-full max-w-3xl flex-col gap-8 px-4 py-8',
			'sm:px-8',
			'md:rounded-lg md:px-16 md:py-16',
			'bg-white dark:bg-slate-950'
		]}
	>
		{@render children()}
	</main>
</div>
