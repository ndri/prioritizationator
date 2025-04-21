<script lang="ts">
	import ProjectList from '$lib/components/ProjectList.svelte';
	import { createTitle } from '$lib/utils/title';
</script>

<svelte:head><title>{createTitle('Projects')}</title></svelte:head>

<ProjectList />
