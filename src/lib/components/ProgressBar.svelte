<script lang="ts">
	interface Props {
		progress: number;
		total: number;
		size?: 'sm' | 'md';
	}

	const { progress, total, size = 'md' }: Props = $props();

	let percentage = $derived(Math.round((Math.min(progress, total) / total) * 100));

	const sizeClasses = {
		sm: 'h-2',
		md: 'h-3'
	}[size];
</script>

<div
	class={['relative w-full overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800', sizeClasses]}
>
	<div
		class="absolute left-0 top-0 h-full bg-indigo-500 dark:bg-indigo-600"
		style="width: {percentage}%;"
	></div>
</div>
