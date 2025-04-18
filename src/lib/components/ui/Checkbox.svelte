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
		xs: 'h-3 w-3 rounded-xs',
		sm: 'h-4 w-4 rounded-sm',
		md: 'h-5 w-5 rounded-md',
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
		'border-main-300 bg-white',
		'hover:bg-main-100',
		'checked:bg-accent-600 checked:border-none',
		'checked:hover:bg-accent-500',
		'dark:bg-main-800 dark:border-none',
		'dark:hover:bg-main-700',
		'focus-visible:outline-2 focus-visible:outline-offset-2',
		'focus:outline-accent-600 focus:border-none focus:ring-0! focus:[box-shadow:none]!',
		sizeClasses[size],
		className
	]}
	{onchange}
	{onblur}
/>
