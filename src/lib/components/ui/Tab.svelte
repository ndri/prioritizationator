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
		'group flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium',
		'text-slate-500 hover:text-slate-600 aria-[selected=true]:text-slate-700',
		'aria-[selected=true]:bg-slate-100',
		'dark:text-slate-400 dark:hover:text-slate-300 aria-[selected=true]:dark:text-slate-200',
		'aria-[selected=true]:dark:bg-slate-800'
	]}
	aria-selected={active}
	{onclick}
>
	<span class="group-aria-[selected=true]:font-semibold">{label}</span>
	{#if tag}
		<div
			class={[
				'rounded-full px-1.5 text-xs',
				'text-slate-500 group-aria-[selected=true]:text-slate-600',
				'bg-slate-100 group-aria-[selected=true]:bg-slate-200',
				'dark:text-slate-300 group-aria-[selected=true]:dark:text-slate-200',
				'dark:bg-slate-800 group-aria-[selected=true]:dark:bg-slate-700'
			]}
		>
			{tag}
		</div>
	{/if}
</button>
