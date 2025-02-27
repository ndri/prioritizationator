<script lang="ts">
	import CheckCircleIcon from './heroicons/mini/CheckCircleIcon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		title: string;
		ratingsProgress: number;
		ratingsRequired: number;
		rankingPath: string;
	}

	const { title, ratingsProgress, ratingsRequired, rankingPath }: Props = $props();
</script>

<div
	class="flex flex-col justify-between gap-4 rounded-lg bg-white p-5 shadow-sm dark:bg-slate-950"
>
	{#if ratingsProgress === ratingsRequired}
		<div class="flex flex-row gap-2.5">
			<div class="text-lg font-medium">{title}</div>
			<div class="flex flex-row flex-wrap items-center gap-1 text-sm text-green-600">
				<CheckCircleIcon /> Rated!
			</div>
		</div>
		<div class="flex-grow text-sm text-slate-400 dark:text-slate-500">
			Keep rating to improve accuracy.
		</div>
	{:else}
		<div class="text-lg font-medium">{title}</div>
		<div class="flex flex-col gap-2">
			<span class="text-sm text-slate-400 dark:text-slate-500">
				{ratingsProgress}/{ratingsRequired} rated
			</span>
			<ProgressBar progress={ratingsProgress} total={ratingsRequired} size="sm" />
		</div>
	{/if}
	<Button href={rankingPath} variant="secondary">Rate</Button>
</div>
