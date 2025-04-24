<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		progress: number;
		total: number;
		size?: 'sm' | 'md' | 'lg' | 'xs';
		animateOnComplete?: boolean;
	}

	const { progress, total, size = 'md', animateOnComplete = false }: Props = $props();

	let percentage = $derived(Math.round((Math.min(progress, total) / total) * 100));

	let mountedComplete = $state(false);

	onMount(() => {
		if (progress === total) mountedComplete = true;
	});

	const sizeClasses = {
		xs: 'h-1.5',
		sm: 'h-2',
		md: 'h-3',
		lg: 'h-4'
	}[size];
</script>

<div class="relative w-full">
	{#if animateOnComplete && !mountedComplete}
		<div
			class={[
				'bg-accent-300 dark:bg-accent-800 absolute top-0 left-0 h-full w-full rounded-full',
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
