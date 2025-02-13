<script lang="ts">
	import ProgressBar from './ProgressBar.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		title: string;
		ratingsProgress: number;
		ratingsRequired: number;
		rankingPath: string;
	}

	const { title, ratingsProgress, ratingsRequired, rankingPath } = $props();
</script>

<div class="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-sm dark:bg-slate-950">
	<div class="text-lg font-medium">{title}</div>
	<div class="text-sm text-slate-400 dark:text-slate-500">{ratingsProgress}/{ratingsRequired}</div>
	<ProgressBar progress={ratingsProgress} total={ratingsRequired} size="sm" />
	<Button href={rankingPath} variant="secondary">Rate</Button>
</div>
