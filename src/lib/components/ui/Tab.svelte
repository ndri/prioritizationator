<script lang="ts">
	interface Props {
		label: string;
		active: boolean;
		onclick: () => void;
	}

	const { label, active, onclick }: Props = $props();
</script>

<button
	role="tab"
	class={[
		'rounded-lg px-3 py-2 text-sm font-medium',
		'aria-[selected=true]:font-semibold',
		'text-slate-500 hover:text-slate-600',
		'dark:text-slate-400 dark:hover:text-slate-300',
		'aria-[selected=true]:bg-slate-200 aria-[selected=true]:text-slate-700',
		'aria-[selected=true]:dark:bg-slate-800 aria-[selected=true]:dark:text-slate-200'
	]}
	aria-selected={active}
	{onclick}
>
	{label}
</button>
