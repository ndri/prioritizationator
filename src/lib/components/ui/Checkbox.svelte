<script lang="ts">
	import type { ChangeEventHandler, ClassValue, FocusEventHandler } from 'svelte/elements';

	interface Props {
		id: string;
		name?: string;
		label: string;
		disabled?: boolean;
		value?: boolean;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: ClassValue;
		checked: boolean;
		onchange?: ChangeEventHandler<HTMLInputElement>;
		onblur?: FocusEventHandler<HTMLInputElement>;
	}

	let {
		id,
		name = id,
		label,
		disabled = false,
		size = 'md',
		class: className,
		checked = $bindable(),
		onchange,
		onblur
	}: Props = $props();

	// Size classes for checkbox
	const sizeClasses = {
		xs: 'h-3 w-3 rounded-sm',
		sm: 'h-4 w-4 rounded',
		md: 'h-5 w-5 rounded',
		lg: 'h-6 w-6 rounded-md',
		xl: 'h-7 w-7 rounded-lg'
	} as const;
</script>

<input
	type="checkbox"
	{id}
	{name}
	aria-label={label}
	{disabled}
	bind:checked
	class={[
		'cursor-pointer border',
		'border-slate-300 bg-white text-indigo-600',
		'hover:bg-slate-100 hover:text-indigo-500',
		'dark:border-none dark:bg-slate-800',
		'dark:hover:bg-slate-700',
		'disabled:border-slate-300 disabled:bg-slate-100 disabled:checked:bg-slate-100',
		'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		'focus:ring-0! focus:border-none focus:outline-indigo-600 focus:[box-shadow:none]',
		sizeClasses[size],
		className
	]}
	{onchange}
	{onblur}
/>
