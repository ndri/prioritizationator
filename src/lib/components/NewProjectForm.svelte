<script lang="ts">
	import { goto } from '$app/navigation';
	import { createProject } from '../db';
	import Button from './ui/Button.svelte';
	import TextInput from './ui/TextInput.svelte';

	let projectName = $state('');

	const submitForm = async (event: Event) => {
		event.preventDefault();
		if (!projectName) return;
		const projectId = await createProject({ name: projectName });
		goto(`/projects/${projectId}/intro/1`);
	};
</script>

<section>
	<h2 class="mb-4 text-xl font-medium">Create a new project</h2>
	<form class="flex items-center gap-2" onsubmit={submitForm}>
		<div class="grow">
			<TextInput
				id="projectNameInput"
				label="Project name"
				placeholder="Enter a project name"
				size="lg"
				bind:value={projectName}
				autocomplete="off"
				hiddenLabel
				autofocus
			/>
		</div>
		<Button type="submit" variant="primary" size="lg">Create</Button>
	</form>
</section>
