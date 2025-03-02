<script lang="ts">
	import '@fontsource-variable/inter';
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	let { children } = $props();
</script>

<div
	class="relative flex min-h-full flex-row items-start justify-center gap-2 bg-slate-100 p-16 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
>
	<Sidebar />
	<main class="flex w-full max-w-3xl flex-col gap-8 rounded-lg bg-white p-16 dark:bg-slate-950">
		{@render children()}
	</main>
</div>
