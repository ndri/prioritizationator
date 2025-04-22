<script lang="ts">
	import CheckCircleIcon from './heroicons/mini/CheckCircleIcon.svelte';
	import StarIcon from './heroicons/mini/StarIcon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		title: string;
		ratingsProgress: number;
		ratingsRequired: number;
		ratingPath: string;
	}

	const { title, ratingsProgress, ratingsRequired, ratingPath }: Props = $props();

	const percentage = Math.round((ratingsProgress / ratingsRequired) * 100);
</script>

<div class="bg-main-50 dark:bg-main-900 flex flex-col justify-between gap-4 rounded-lg p-5">
	{#if ratingsProgress === ratingsRequired}
		<div class="flex flex-col-reverse gap-2.5 @lg:flex-row">
			<div class="text-lg font-medium">{title}</div>
			<div class="flex flex-row flex-wrap items-center gap-1 text-sm text-green-600">
				<CheckCircleIcon /> Rated!
			</div>
		</div>
		<div class="text-main-500 dark:text-main-400 grow text-sm">
			Keep rating to improve accuracy.
		</div>
	{:else}
		<div class="text-lg font-medium">{title}</div>
		<div class="flex flex-col gap-2">
			<span class="text-main-500 dark:text-main-400 text-sm">
				{percentage}% rated
			</span>
			<ProgressBar progress={ratingsProgress} total={ratingsRequired} size="sm" />
		</div>
	{/if}
	<Button href={ratingPath} variant="secondary" Icon={StarIcon} size="lg">Rate</Button>
</div>
