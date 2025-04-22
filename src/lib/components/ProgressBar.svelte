<script lang="ts">
	interface Props {
		progress: number;
		total: number;
		size?: 'sm' | 'md' | 'lg' | 'xs';
		animateOnComplete?: boolean;
	}

	const { progress, total, size = 'md', animateOnComplete = false }: Props = $props();

	let percentage = $derived(Math.round((Math.min(progress, total) / total) * 100));

	const sizeClasses = {
		xs: 'h-1.5',
		sm: 'h-2',
		md: 'h-3',
		lg: 'h-4'
	}[size];
</script>

<div class="relative w-full">
	{#if animateOnComplete}
		<div
			class={[
				'bg-accent-500 dark:bg-accent-600 absolute top-0 left-0 h-full w-full rounded-full',
				percentage === 100 ? 'animate-progress-bar-boom' : 'invisible'
			]}
		></div>
	{/if}
	<div class={['bg-main-200 dark:bg-main-800 relative w-full rounded-lg', sizeClasses]}>
		<div
			class={[
				'bg-accent-500 dark:bg-accent-600 absolute top-0 left-0 h-full rounded-lg',
				'transition-[width] duration-300 ease-out'
			]}
			style="width: {percentage}%;"
		></div>
	</div>
</div>
