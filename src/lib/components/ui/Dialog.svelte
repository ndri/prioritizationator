<script lang="ts">
	import type { Snippet } from 'svelte';
	import Transition from 'svelte-transition';

	interface Props {
		body: Snippet;
		footer: Snippet;
	}

	let { body, footer }: Props = $props();

	let isOpen = $state(false);
	let show = $state(false);

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	export function open() {
		isOpen = true;
		show = true;
	}
	export function close() {
		show = false;
		setTimeout(() => {
			isOpen = false;
		}, 200);
	}
</script>

{#if isOpen}
	<div class="relative z-30" role="dialog" aria-modal="true">
		<Transition
			{show}
			appear
			enter="ease-out duration-100"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
		>
			<div
				class="fixed inset-0 bg-slate-500/75 transition-opacity dark:bg-slate-800/85"
				aria-hidden="true"
			></div>
		</Transition>
		<div class="fixed inset-0 z-30 w-screen overflow-y-auto">
			<button
				class="flex min-h-full w-full cursor-auto items-end justify-center p-4 text-center sm:items-center sm:p-0"
				aria-label="Close dialog"
				onclick={(e) => {
					if (e.target === e.currentTarget) close();
				}}
			>
				<Transition
					{show}
					appear
					enter="ease-out duration-100"
					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enterTo="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in duration-200"
				>
					<div
						class="relative w-full transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:max-w-md"
					>
						<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-slate-950">
							{@render body()}
						</div>
						<div
							class="flex flex-col gap-2 bg-slate-50 px-4 py-3 sm:flex-row-reverse sm:px-6 dark:bg-slate-900"
						>
							{@render footer()}
						</div>
					</div>
				</Transition>
			</button>
		</div>
	</div>
{/if}
