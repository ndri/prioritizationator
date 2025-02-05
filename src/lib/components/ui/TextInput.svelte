<script lang="ts">
	import type { ClassValue, FullAutoFill, HTMLInputTypeAttribute } from 'svelte/elements';

	interface Props {
		id: string;
		name?: string;
		label: string;
		type?: HTMLInputTypeAttribute;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		autocomplete?: FullAutoFill;
		helpText?: string;
		value?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		hiddenLabel?: boolean;
		class?: ClassValue;
		[key: string]: any;
	}

	let {
		id,
		name = id,
		label,
		type = 'text',
		placeholder,
		required = false,
		disabled = false,
		autocomplete,
		helpText,
		size = 'md',
		hiddenLabel = false,
		value = $bindable(''),
		class: className,
		...props
	}: Props = $props();

	const sizeClasses = {
		xs: 'px-2 py-1 text-xs',
		sm: 'px-2 py-1 text-sm',
		md: 'px-2.5 py-1.5 text-sm',
		lg: 'px-3 py-2 text-sm',
		xl: 'px-3.5 py-2.5 text-base'
	} as const;

	const inputClasses = [
		'block w-full rounded-md',
		sizeClasses[size],
		'bg-white dark:bg-white/5',
		'text-slate-900 dark:text-white',
		'placeholder:text-slate-400 dark:placeholder:text-slate-500',
		'outline outline-1 -outline-offset-1',
		'outline-slate-300 dark:outline-slate-700',
		'focus:-outline-offset-1 focus:outline-indigo-600 dark:focus:outline-indigo-500',
		'disabled:opacity-50 disabled:cursor-not-allowed',
		'border-none',
		className
	];

	const labelClasses = [
		'block font-medium',
		size === 'xs' ? 'text-xs' : 'text-sm/6',
		'text-slate-900 dark:text-white',
		hiddenLabel && 'sr-only'
	];

	const helpTextClasses = [
		size === 'xs' ? 'text-xs' : 'text-sm/6',
		'text-slate-600 dark:text-slate-400'
	];
</script>

<div class="flex flex-col gap-2">
	<label for={id} class={labelClasses}>
		{label}
	</label>
	<input
		{id}
		{name}
		{type}
		{placeholder}
		{required}
		{disabled}
		{autocomplete}
		bind:value
		class={inputClasses}
		{...props}
	/>
	{#if helpText}
		<p class={helpTextClasses}>{helpText}</p>
	{/if}
</div>
