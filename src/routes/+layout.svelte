<script lang="ts">
	import '@fontsource-variable/inter';
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="text-100 flex min-h-full flex-col items-center bg-slate-100 p-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
>
	<main class="flex w-full max-w-3xl flex-col gap-8 rounded-2xl bg-slate-50 p-16 dark:bg-slate-900">
		{@render children()}
	</main>
</div>
