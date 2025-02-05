<script lang="ts">
	interface Props {
		label: string;
		score: number;
	}

	const { label, score }: Props = $props();
</script>

<div class="flex flex-col items-center px-1">
	<span class="text-xs font-medium text-slate-400 dark:text-slate-500">{label}</span>
	<span class="text-sm font-medium text-slate-700 dark:text-slate-300">{score}</span>
</div>
