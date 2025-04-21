<script lang="ts">
	import { createTitle } from '$lib/utils/title';
	import NewProjectForm from '$lib/components/NewProjectForm.svelte';
	import ProjectTemplates from '$lib/components/ProjectTemplates.svelte';
</script>

<svelte:head><title>{createTitle('New project')}</title></svelte:head>

<NewProjectForm />
<ProjectTemplates />
