<script lang="ts">
	import NoSymbolIcon from './heroicons/mini/NoSymbolIcon.svelte';
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
			'group flex flex-nowrap items-center gap-1.5 rounded-full py-1 pl-1.5 pr-2',
			'bg-slate-100 text-slate-700',
			'hover:bg-slate-200',
			'dark:bg-slate-800 dark:text-slate-300',
			'dark:hover:bg-slate-700'
		]}
		{onclick}
	>
		<NoSymbolIcon
			class={[
				'text-slate-400 group-hover:text-slate-500',
				'dark:text-slate-500 dark:group-hover:text-slate-400'
			]}
		/>
		<span class="text-sm">{tasksCount}</span>
	</button>
</Tooltip>
