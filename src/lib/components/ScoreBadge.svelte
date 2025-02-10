<script lang="ts">
	interface Props {
		label: string;
		score: number;
		rated: boolean;
	}

	const { label, score, rated = true }: Props = $props();
</script>

<div class="flex flex-col items-center px-1">
	<span class="whitespace-nowrap text-xs font-medium text-slate-500 dark:text-slate-400">
		{label}
	</span>
	<span
		class={[
			'text-sm font-medium ',
			rated ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'
		]}
	>
		{score}{rated ? '' : '?'}
	</span>
</div>
