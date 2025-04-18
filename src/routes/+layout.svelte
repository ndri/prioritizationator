<script lang="ts">
	import '@fontsource-variable/inter';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<div
	class={[
		'relative flex min-h-full flex-col items-center justify-start p-0',
		'md:justify-center',
		'lg:flex-row lg:items-start',
		'bg-white text-slate-900 lg:bg-slate-50 ',
		'dark:bg-slate-900 dark:text-slate-100'
	]}
>
	<Navbar />
	<main class={['flex h-screen w-full flex-col overflow-y-scroll p-0', 'lg:p-4']}>
		<div
			class={[
				'@container',
				'flex justify-center p-4 pt-24',
				'border-slate-200 bg-white',
				'dark:border-slate-800 dark:bg-slate-950',
				'lg:rounded-lg lg:border lg:p-16'
			]}
		>
			<div class="flex w-full max-w-3xl flex-col gap-8">{@render children()}</div>
		</div>
	</main>
</div>
