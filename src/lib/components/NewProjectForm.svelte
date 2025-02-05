<script lang="ts">
	import { createProject, db } from '../db';
	import Button from './ui/Button.svelte';
	import TextInput from './ui/TextInput.svelte';

	let projectName = $state('');

	const submitForm = (event: Event) => {
		event.preventDefault();
		createProject({ name: projectName });
		projectName = '';
	};
</script>

<section>
	<h2 class="mb-4 text-xl font-medium">Add new project</h2>
	<form class="flex items-center gap-2" onsubmit={submitForm}>
		<div class="grow">
			<TextInput
				id="projectNameInput"
				label="Project name"
				placeholder="Enter a project name"
				size="xl"
				bind:value={projectName}
				hiddenLabel
			/>
		</div>
		<Button type="submit" variant="primary" size="xl">Add project</Button>
	</form>
</section>
