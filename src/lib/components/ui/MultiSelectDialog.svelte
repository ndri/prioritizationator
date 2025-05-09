<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';
	import Dialog from './Dialog.svelte';
	import MultiSelectInput from './MultiSelectInput.svelte';

	interface Props {
		label: string | Snippet;
		options: { value: T; label: string }[];
		submit: (value: T[]) => void;
	}

	let { label, options, submit }: Props = $props();

	let dialog = $state<Dialog>();
	let values = $state<T[]>([]);

	let customOptions = $state(options);
	$effect(() => {
		customOptions = options;
	});

	export function open() {
		customOptions.sort((a, b) => {
			const aIndex = values.indexOf(a.value);
			const bIndex = values.indexOf(b.value);
			if (aIndex !== -1 && bIndex === -1) return -1;
			if (aIndex === -1 && bIndex !== -1) return 1;
			return 0;
		});
		dialog?.open();
	}
	export function close() {
		dialog?.close();
	}
	export function setValues(newValues: T[]) {
		values = newValues;
	}
</script>

{#snippet body()}
	<form
		id="multiSelectDialogForm"
		class="flex flex-col gap-3"
		onsubmit={(e) => {
			e.preventDefault();
			submit(values);
			close();
		}}
	>
		{#if typeof label === 'string'}
			<p>{label}</p>
		{:else}
			{@render label()}
		{/if}
		<MultiSelectInput
			id="blockedByDialogInput"
			name="blockedBy"
			label="Blocked by"
			options={customOptions}
			bind:values
			hiddenLabel
		/>
	</form>
{/snippet}

{#snippet footer()}
	<Button
		type="submit"
		label="Apply"
		variant="primary"
		class="w-full sm:w-auto"
		form="multiSelectDialogForm"
	/>
	<Button label="Cancel" variant="secondary" class="w-full sm:w-auto" onclick={close} />
{/snippet}

<Dialog bind:this={dialog} {body} {footer} />
