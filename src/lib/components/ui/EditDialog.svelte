<script lang="ts">
	import Button from './Button.svelte';
	import Dialog from './Dialog.svelte';
	import TextInput from './TextInput.svelte';

	interface Props {
		label: string;
		submit: (value: string) => void;
	}

	let { label, submit }: Props = $props();

	let dialog = $state<Dialog>();
	let value = $state('');

	export function open() {
		dialog?.open();
	}
	export function close() {
		dialog?.close();
	}
	export function setValue(newValue: string) {
		value = newValue;
	}
</script>

{#snippet body()}
	<form
		onsubmit={(e) => {
			e.preventDefault();
			submit(value);
			close();
		}}
		class="flex flex-col gap-2"
		id="editDialogForm"
	>
		<TextInput id="editDialogInput" {label} bind:value autofocus />
	</form>
{/snippet}

{#snippet footer()}
	<Button type="submit" label="Edit" class="w-full sm:w-auto" form="editDialogForm" />
	<Button label="Cancel" variant="secondary" class="w-full sm:w-auto" onclick={close} />
{/snippet}

<Dialog bind:this={dialog} {body} {footer} />
