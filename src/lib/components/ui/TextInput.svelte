<script lang="ts">
	import { onMount } from 'svelte';
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
		autofocus?: boolean;
		ref?: HTMLInputElement;
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
		autofocus = false,
		ref = $bindable(),
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
		'text-main-900 dark:text-white',
		'placeholder:text-main-400 dark:placeholder:text-main-500',
		'outline outline-1 -outline-offset-1',
		'outline-main-300 dark:outline-main-700',
		'focus:-outline-offset-1 focus:outline-accent-600 dark:focus:outline-accent-500',
		'disabled:opacity-50 disabled:cursor-not-allowed',
		'border-none',
		className
	];

	const labelClasses = [
		'block font-medium',
		size === 'xs' ? 'text-xs' : 'text-sm/6',
		'text-main-900 dark:text-white',
		hiddenLabel && 'sr-only'
	];

	const helpTextClasses = [
		size === 'xs' ? 'text-xs' : 'text-sm/6',
		'text-main-600 dark:text-main-400'
	];

	// Timeout so autofocus works with transitioned elements
	if (autofocus) onMount(() => setTimeout(() => ref?.focus()));
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
		bind:this={ref}
		{...props}
	/>
	{#if helpText}
		<p class={helpTextClasses}>{helpText}</p>
	{/if}
</div>
