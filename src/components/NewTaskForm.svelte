<script lang="ts">
	import { createTask } from '../db';

	interface Props {
		projectId: number;
	}

	const { projectId } = $props();

	let taskName = $state('');

	const submitForm = (event: Event) => {
		event.preventDefault();
		createTask({ projectId, name: taskName });
		taskName = '';
	};
</script>

<section>
	<h2 class="mb-4 text-xl font-medium">Add new task</h2>
	<form class="flex flex-col items-start gap-2" onsubmit={submitForm}>
		<div class="flex flex-col gap-1">
			<label for="taskNameInput" class="text-sm">Task name:</label>
			<input
				type="text"
				name="taskName"
				id="taskNameInput"
				class="rounded-lg border-slate-700 bg-slate-900 text-sm"
				bind:value={taskName}
			/>
		</div>
		<button
			type="submit"
			class="hover:pointer rounded-lg bg-indigo-600 px-2.5 py-1.5 text-sm text-white hover:bg-indigo-500"
		>
			Add task
		</button>
	</form>
</section>
