<script lang="ts">
	import { NoSymbolIcon } from '@sidekickicons/svelte/20/solid';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		tasksCount: number;
		onclick: () => void;
	}

	const { tasksCount, onclick }: Props = $props();
</script>

<Tooltip text="Blocked by {tasksCount} task{tasksCount === 1 ? '' : 's'}" class="relative">
	<button
		class={[
			'group flex cursor-pointer flex-nowrap items-center gap-1.5 rounded-full py-1 pr-2 pl-1.5',
			'text-main-500 border-main-200 border bg-white',
			'hover:text-main-600 hover:bg-main-100',
			'dark:text-main-300 dark:bg-main-800 dark:border-none',
			'dark:hover:text-main-200 dark:hover:bg-main-700'
		]}
		{onclick}
	>
		<NoSymbolIcon
			class={[
				'text-main-400 group-hover:text-main-500',
				'dark:text-main-500 dark:group-hover:text-main-400'
			]}
		/>
		<span class="text-sm">{tasksCount}</span>
	</button>
</Tooltip>
