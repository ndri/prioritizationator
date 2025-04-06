<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		id: string;
		name?: string;
		label: string;
		options: { value: string; label: string }[];
		value?: string;
		disabled?: boolean;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: ClassValue;
		onchange?: (e: Event) => void;
	}

	let {
		id,
		name = id,
		label,
		options,
		value = $bindable(),
		disabled = false,
		size = 'md',
		class: className,
		onchange
	}: Props = $props();

	const sizeClasses = {
		xs: 'px-2 py-1 text-xs',
		sm: 'px-2 py-1 text-sm',
		md: 'px-2.5 py-1.5 text-sm',
		lg: 'px-3 py-2 text-sm',
		xl: 'px-3.5 py-2.5 text-base'
	} as const;

	const selectClasses = [
		'block w-full rounded-md',
		sizeClasses[size],
		'bg-white dark:bg-white/5',
		'text-slate-900 dark:text-white',
		'placeholder:text-slate-400 dark:placeholder:text-slate-500',
		'outline outline-1 -outline-offset-1',
		'outline-slate-300 dark:outline-slate-700',
		'focus:-outline-offset-1 focus:outline-indigo-600 dark:focus:outline-indigo-500',
		'disabled:opacity-50 disabled:cursor-not-allowed',
		className
	];
</script>

<select {id} {name} aria-label={label} bind:value class={selectClasses} {disabled} {onchange}>
	<option value="" disabled selected hidden>
		{label}
	</option>
	{#each options as { value, label }}
		<option {value}>{label}</option>
	{/each}
</select>
