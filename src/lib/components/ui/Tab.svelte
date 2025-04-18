<script lang="ts">
	interface Props {
		label: string;
		active: boolean;
		tag?: string;
		onclick: () => void;
	}

	const { label, active, tag, onclick }: Props = $props();
</script>

<button
	role="tab"
	class={[
		'group flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-sm font-medium',
		'text-main-500 hover:text-main-600 aria-selected:text-main-700',
		'aria-selected:bg-main-100',
		'dark:text-main-400 dark:hover:text-main-300 dark:aria-selected:text-main-200',
		'dark:aria-selected:bg-main-900',
		'focus-outline'
	]}
	aria-selected={active}
	{onclick}
>
	<span class="group-aria-selected:font-semibold">{label}</span>
	{#if tag}
		<div
			class={[
				'rounded-full px-1.5 text-xs',
				'text-main-500 group-aria-selected:text-main-600',
				'bg-main-100 group-aria-selected:bg-main-200',
				'dark:text-main-300 dark:group-aria-selected:text-main-200',
				'dark:bg-main-800 dark:group-aria-selected:bg-main-700'
			]}
		>
			{tag}
		</div>
	{/if}
</button>
