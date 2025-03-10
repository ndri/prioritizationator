<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from './Button.svelte';

	interface Props {
		open: boolean;
		title: string;
		description: string;
		buttons: ComponentProps<typeof Button>[];
	}

	let { open = $bindable(), title, description, buttons }: Props = $props();
</script>

{#if open}
	<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div
			class="fixed inset-0 bg-slate-500/75 transition-opacity dark:bg-slate-800/85"
			aria-hidden="true"
		></div>
		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<button
				class="flex min-h-full w-full cursor-default items-end justify-center p-4 text-center sm:items-center sm:p-0"
				aria-label="Close dialog"
				onclick={(e) => {
					if (e.target === e.currentTarget) open = false;
				}}
			>
				<div
					class="relative w-full max-w-sm transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:max-w-md"
				>
					<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-slate-950">
						<div class="mt-3 text-center sm:mt-0 sm:text-left">
							<h3 class="text-base font-semibold" id="modal-title">
								{title}
							</h3>
							<div class="mt-2">
								<p class="text-sm text-slate-500 dark:text-slate-400">
									{description}
								</p>
							</div>
						</div>
					</div>
					<div
						class="flex flex-col gap-2 bg-slate-50 px-4 py-3 sm:flex-row-reverse sm:px-6 dark:bg-slate-900"
					>
						{#each buttons as buttonProps}
							<Button {...buttonProps} class="w-full sm:w-auto" />
						{/each}
					</div>
				</div>
			</button>
		</div>
	</div>
{/if}
