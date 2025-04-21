<script lang="ts">
	import TaskPairingPage from '$lib/components/TaskPairingPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
</script>

<TaskPairingPage {projectId} dimension="ease" intro />
