<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { ClassValue, HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		class: ClassValue;
		items: { label: string; Icon: Component; onSelect: () => void }[];
		button: Snippet<[HTMLButtonAttributes]>;
		label?: string;
	}

	const { class: className, items, button, label = 'Menu' }: Props = $props();

	let isOpen = $state(false);
	let menuRef = $state<HTMLDivElement>();
	let dropdownRef = $state<HTMLDivElement>();
	let closeOnEscapeHandler = $state<(event: KeyboardEvent) => void>();

	const closeMenu = () => {
		removeCloseOnEscape();
		isOpen = false;
	};

	const openMenu = () => {
		closeOnEscape();
		isOpen = true;
	};

	const toggleMenu = () => {
		isOpen ? closeMenu() : openMenu();
	};

	const handleCloseOnFocusOut = (event: FocusEvent) => {
		if (!dropdownRef?.contains(event.relatedTarget as Node)) {
			closeMenu();
		}
	};

	const closeOnEscape = () => {
		closeOnEscapeHandler = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closeMenu();
		};
		window.addEventListener('keydown', closeOnEscapeHandler);
	};

	const removeCloseOnEscape = () => {
		if (!closeOnEscapeHandler) return;
		window.removeEventListener('keydown', closeOnEscapeHandler);
	};
</script>

<div class={['relative', className]} bind:this={dropdownRef} onfocusout={handleCloseOnFocusOut}>
	{@render button({ onclick: toggleMenu, 'aria-expanded': isOpen, 'aria-haspopup': true })}
	{#if isOpen}
		<div
			class="absolute right-0 z-10 mt-2 flex w-36 origin-top-right flex-col rounded-md bg-white shadow-lg shadow-slate-500/25 ring-1 ring-slate-300 dark:bg-slate-950 dark:shadow-slate-900/50 dark:ring-0"
			role="menu"
			aria-orientation="vertical"
			aria-label={label}
			bind:this={menuRef}
		>
			{#each items as { label, Icon, onSelect }}
				<button
					class="group/menuitem dark:hover:text-slate flex gap-2.5 rounded-md px-2.5 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-300 dark:hover:bg-slate-900"
					role="menuitem"
					onclick={() => {
						onSelect();
						closeMenu();
					}}
				>
					<Icon
						className="text-slate-400 dark:text-slate-500 group-hover/menuitem:text-slate-500 dark:group-hover/menuitem:text-slate-400"
					/>
					<span>{label}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
