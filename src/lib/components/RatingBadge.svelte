<script lang="ts">
	interface Props {
		label: string;
		rating: number;
		rated: boolean;
	}

	const { label, rating, rated = true }: Props = $props();
</script>

<div class="flex flex-col items-center px-1">
	<span class="text-main-500 dark:text-main-400 text-xs font-medium whitespace-nowrap">
		{label}
	</span>
	<span
		class={[
			'text-sm font-medium',
			rated ? 'text-main-700 dark:text-main-300' : 'text-main-400 dark:text-main-500'
		]}
	>
		{Math.round(rating)}{rated ? '' : '?'}
	</span>
</div>
