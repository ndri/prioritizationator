<script lang="ts">
	interface Props {
		progress: number;
		total: number;
	}

	const { progress, total }: Props = $props();

	let percentage = $derived(Math.round((Math.min(progress, total) / total) * 100));
</script>

<div class="relative h-3 w-full overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
	<div
		class="absolute left-0 top-0 h-full bg-indigo-500 dark:bg-indigo-600"
		style="width: {percentage}%;"
	></div>
</div>
