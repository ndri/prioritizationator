<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLButtonAttributes } from 'svelte/elements';
	import type { Heroicon } from '$lib/Heroicon';
	import Transition from 'svelte-transition';

	interface Props {
		class: ClassValue;
		items: { label: string; Icon: Heroicon; onSelect?: () => void; href?: string }[];
		button: Snippet<[HTMLButtonAttributes]>;
		label?: string;
	}

	const { class: className, items, button, label = 'Menu' }: Props = $props();

	let isOpen = $state(false);
	let show = $state(false);
	let menuRef = $state<HTMLDivElement>();
	let dropdownRef = $state<HTMLDivElement>();
	let closeOnEscapeHandler = $state<(event: KeyboardEvent) => void>();

	const closeMenu = () => {
		removeCloseOnEscape();
		show = false;
		setTimeout(() => {
			isOpen = false;
		}, 200);
	};

	const openMenu = () => {
		closeOnEscape();
		isOpen = true;
		show = true;
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

	const itemClasses =
		'group/menuitem cursor-pointer dark:hover:text-main-300 flex gap-2.5 whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm text-main-700 hover:bg-main-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-600 dark:text-main-300 dark:hover:bg-main-900';
	const iconClasses =
		'text-main-400 group-hover/menuitem:text-main-500 dark:text-main-500 dark:group-hover/menuitem:text-main-400';
</script>

<div class={['relative', className]} bind:this={dropdownRef} onfocusout={handleCloseOnFocusOut}>
	{@render button({ onclick: toggleMenu, 'aria-expanded': isOpen, 'aria-haspopup': true })}
	{#if isOpen}
		<Transition
			{show}
			appear
			enter="transition-all ease-out duration-75"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition-all ease-in duration-200"
		>
			<div
				class="dark:bg-main-950 ring-main-300 dark:ring-main-800 absolute top-full right-0 z-10 mt-1 flex min-w-40 origin-top-right flex-col rounded-md bg-white ring-1"
				role="menu"
				aria-orientation="vertical"
				aria-label={label}
				bind:this={menuRef}
			>
				{#each items as { label, Icon, onSelect, href }}
					{#if href}
						<a class={itemClasses} role="menuitem" {href}>
							<Icon class={iconClasses} />
							<span>{label}</span>
						</a>
					{:else if onSelect}
						<button
							class={itemClasses}
							role="menuitem"
							onclick={() => {
								onSelect();
								closeMenu();
							}}
						>
							<Icon class={iconClasses} />
							<span>{label}</span>
						</button>
					{/if}
				{/each}
			</div>
		</Transition>
	{/if}
</div>
