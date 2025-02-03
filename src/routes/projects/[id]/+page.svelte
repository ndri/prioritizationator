<script lang="ts">
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { db } from '../../../db';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const projectId = Number(data.id);
	const projectQuery = stateQuery(() => db.projects.where({ id: projectId }).first());
	const project = $derived(projectQuery.current);
</script>

<a href="/">Back to projects</a>

<h1 class="text-3xl font-bold">{project?.name}</h1>
