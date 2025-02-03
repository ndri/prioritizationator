<script lang="ts">
	import { db } from '../db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import TrashIcon from '../components/heroicons/micro/TrashIcon.svelte';
	import ProjectList from '../components/ProjectList.svelte';
	import NewProjectForm from '../components/NewProjectForm.svelte';

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

<h1 class="text-3xl font-bold">Prioritizationator</h1>

<ProjectList />
<NewProjectForm />
