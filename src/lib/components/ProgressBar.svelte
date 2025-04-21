<script lang="ts">
	interface Props {
		progress: number;
		total: number;
		size?: 'sm' | 'md' | 'lg';
	}

	const { progress, total, size = 'md' }: Props = $props();

	let percentage = $derived(Math.round((Math.min(progress, total) / total) * 100));

	const sizeClasses = {
		sm: 'h-2',
		md: 'h-3',
		lg: 'h-4'
	}[size];
</script>

<div
	class={['bg-main-200 dark:bg-main-800 relative w-full overflow-hidden rounded-lg', sizeClasses]}
>
	<div
		class={[
			'bg-accent-500 dark:bg-accent-600 absolute top-0 left-0 h-full',
			'transition-[width] duration-300 ease-out'
		]}
		style="width: {percentage}%;"
	></div>
</div>
