<script lang="ts">
	import type { PageProps } from './$types';
	import TaskPairingPage from '$lib/components/TaskPairingPage.svelte';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
</script>

<TaskPairingPage {projectId} dimension="value" />
