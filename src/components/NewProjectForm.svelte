<script lang="ts">
	import { db } from '../db';

	let projectName = $state('');

	const submitForm = (event: Event) => {
		event.preventDefault();
		addProject(projectName);
		projectName = '';
	};

	async function addProject(projectName: string) {
		const id = await db.projects.add({
			name: projectName
		});
	}
</script>

<section>
	<h2 class="mb-4 text-xl font-medium">Add new project</h2>
	<form class="flex flex-col items-start gap-2" onsubmit={submitForm}>
		<div class="flex flex-col gap-1">
			<label for="projectNameInput" class="text-sm">Project name:</label>
			<input
				type="text"
				name="projectName"
				id="projectNameInput"
				class="rounded-lg border-slate-700 bg-slate-900 text-sm"
				bind:value={projectName}
			/>
		</div>
		<button
			type="submit"
			class="hover:pointer rounded-lg bg-indigo-600 px-2.5 py-1.5 text-sm text-white hover:bg-indigo-500"
		>
			Add project
		</button>
	</form>
</section>
