<script module>
	export type ButtonComponentRef = HTMLAnchorElement | HTMLButtonElement | undefined;
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, MouseEventHandler } from 'svelte/elements';
	import type { Heroicon } from '../heroicons/Heroicon';
	import Spinner from './Spinner.svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'text';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		type?: 'button' | 'submit' | 'reset' | null;
		disabled?: boolean | null;
		loading?: boolean;
		href?: string;
		label?: string;
		onclick?: MouseEventHandler<HTMLButtonElement> | null;
		children?: Snippet;
		class?: ClassValue | null;
		Icon?: Heroicon;
		ref?: ButtonComponentRef;
		[key: string]: any;
	}

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		disabled = false,
		loading = false,
		href,
		label,
		onclick,
		children,
		class: className,
		Icon,
		ref = $bindable(),
		...props
	}: Props = $props();

	const sizeClasses = {
		xs: ['text-xs gap-1.5 rounded-sm', variant !== 'text' && 'px-2 py-1.5'],
		sm: ['text-sm gap-1.5 rounded-sm', variant !== 'text' && 'px-2 py-1'],
		md: ['text-sm gap-1.5 rounded-md', variant !== 'text' && 'px-3 py-1.5'],
		lg: ['text-sm gap-2 rounded-md', variant !== 'text' && 'px-3 py-2'],
		xl: ['text-base gap-2 rounded-md', variant !== 'text' && 'px-3.5 py-2.5']
	} as const;

	const variantClasses = {
		primary: ['bg-accent-600 hover:bg-accent-500', 'text-white'],
		secondary: [
			'bg-white dark:bg-main-800 hover:bg-main-100 dark:hover:bg-main-700',
			'text-main-900 dark:text-white',
			'ring-1 ring-inset ring-main-300 dark:ring-0'
		],
		text: ['hover:bg-main-200', 'dark:hover:bg-main-800']
	} as const;

	const buttonClasses = [
		'group/button',
		sizeClasses[size],
		variantClasses[variant],
		'font-semibold inline-flex items-center justify-center whitespace-nowrap cursor-pointer',
		'focus-outline',
		'disabled:opacity-70 disabled:cursor-not-allowed',
		className
	];

	const iconClasses = {
		primary: 'text-white',
		secondary: 'text-main-400 dark:text-main-500',
		text: [
			'text-main-400 group-hover/button:text-main-500',
			'dark:text-main-500 dark:group-hover/button:text-main-400'
		]
	};
</script>

{#snippet contents()}
	{#if loading}
		<Spinner {size} />
	{:else if Icon}
		<Icon class={iconClasses[variant]} />
	{/if}
	{#if label}
		{label}
	{/if}
	{@render children?.()}
{/snippet}

{#if href}
	<a {href} class={buttonClasses} bind:this={ref} {...props}>
		{@render contents()}
	</a>
{:else}
	<button
		{type}
		class={buttonClasses}
		disabled={disabled || loading}
		{onclick}
		bind:this={ref}
		{...props}
	>
		{@render contents()}
	</button>
{/if}
