<script lang="ts">
	import { createTask } from '../db';
	import Button from './ui/Button.svelte';
	import TextInput from './ui/TextInput.svelte';

	interface Props {
		projectId: number;
		autofocus?: boolean;
	}

	const { projectId, autofocus = false }: Props = $props();

	let taskName = $state('');

	const submitForm = (event: Event) => {
		event.preventDefault();
		if (!taskName) return;
		createTask({ projectId, name: taskName });
		taskName = '';
	};
</script>

<section>
	<h2 class="sr-only">Add new task</h2>
	<form class="flex items-center gap-2" onsubmit={submitForm}>
		<div class="grow">
			<TextInput
				id="taskNameInput"
				label="Task name"
				placeholder="New task..."
				size="lg"
				bind:value={taskName}
				hiddenLabel
				autocomplete="off"
				{autofocus}
			/>
		</div>
		<Button type="submit" variant="primary" size="lg">Add task</Button>
	</form>
</section>
