<script module>
	export type ButtonComponentRef = HTMLAnchorElement | HTMLButtonElement | undefined;
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, MouseEventHandler } from 'svelte/elements';

	interface Props {
		variant?: 'primary' | 'secondary' | 'text';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		type?: 'button' | 'submit' | 'reset' | null;
		disabled?: boolean | null;
		href?: string;
		onclick?: MouseEventHandler<HTMLButtonElement> | null;
		children?: Snippet;
		class?: ClassValue | null;
		icon?: Snippet<[ClassValue]>;
		ref?: ButtonComponentRef;
		[key: string]: any;
	}

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		disabled = false,
		href,
		onclick,
		children,
		class: className,
		icon,
		ref = $bindable(),
		...props
	}: Props = $props();

	const sizeClasses = {
		xs: 'rounded px-2 py-1.5 text-xs gap-1.5',
		sm: 'rounded px-2 py-1 text-sm gap-1.5',
		md: 'rounded-md px-2.5 py-1.5 text-sm gap-1.5',
		lg: 'rounded-md px-3 py-2 text-sm gap-1.5',
		xl: 'rounded-md px-3.5 py-2.5 text-base gap-2'
	} as const;

	const variantClasses = {
		primary: ['bg-indigo-600 hover:bg-indigo-500', 'text-white'],
		secondary: [
			'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700',
			'text-slate-900 dark:text-white',
			'ring-1 ring-inset ring-slate-300 dark:ring-0'
		],
		text: ['hover:opacity-70']
	} as const;

	const buttonClasses = [
		sizeClasses[size],
		variantClasses[variant],
		'font-semibold inline-flex items-center justify-center shadow-sm',
		'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		'focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500',
		'disabled:opacity-50 disabled:cursor-not-allowed',
		className
	];

	const iconClasses = {
		primary: 'text-white',
		secondary: 'text-slate-400 dark:text-slate-500',
		text: ''
	};
</script>

{#snippet contents()}
	{@render icon?.(iconClasses[variant])}
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
