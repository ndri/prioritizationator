<script module>
	export type ButtonComponentRef = HTMLAnchorElement | HTMLButtonElement | undefined;
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, MouseEventHandler } from 'svelte/elements';
	import type { Heroicon } from '../heroicons/Heroicon';

	interface Props {
		variant?: 'primary' | 'secondary' | 'text';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		type?: 'button' | 'submit' | 'reset' | null;
		disabled?: boolean | null;
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
		xs: ['text-xs gap-1.5', variant !== 'text' && 'rounded px-2 py-1.5'],
		sm: ['text-sm gap-1.5', variant !== 'text' && 'rounded px-2 py-1'],
		md: ['text-sm gap-1.5', variant !== 'text' && 'rounded-md px-2.5 py-1.5'],
		lg: ['text-sm gap-1.5', variant !== 'text' && 'rounded-md px-3 py-2'],
		xl: ['text-base gap-2', variant !== 'text' && 'rounded-md px-3.5 py-2.5']
	} as const;

	const variantClasses = {
		primary: ['bg-indigo-600 hover:bg-indigo-500', 'text-white', 'shadow-sm'],
		secondary: [
			'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700',
			'text-slate-900 dark:text-white',
			'ring-1 ring-inset ring-slate-300 dark:ring-0',
			'shadow-sm'
		],
		text: ['hover:opacity-70']
	} as const;

	const buttonClasses = [
		sizeClasses[size],
		variantClasses[variant],
		'font-semibold inline-flex items-center justify-center',
		'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		'focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500',
		'disabled:opacity-50 disabled:cursor-not-allowed',
		className
	];

	const iconClasses = {
		primary: 'text-white',
		secondary: 'text-slate-400 dark:text-slate-500',
		text: 'text-slate-400 dark:text-slate-500'
	};
</script>

{#snippet contents()}
	{#if Icon}
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
	<button {type} class={buttonClasses} {disabled} {onclick} bind:this={ref} {...props}>
		{@render contents()}
	</button>
{/if}
