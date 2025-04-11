<script lang="ts">
	import Tab from './Tab.svelte';

	interface Props {
		values: {
			id: string;
			label: string;
			tag?: string;
		}[];
		selected: string;
	}

	let { values, selected = $bindable() }: Props = $props();

	$effect(() => {
		if (!values.some((v) => v.id === selected)) {
			selected = values[0]?.id;
		}
	});
</script>

<div class="flex gap-2">
	{#each values as { id, label, tag } (id)}
		<Tab
			{label}
			active={selected === id}
			{tag}
			onclick={() => {
				selected = id;
			}}
		/>
	{/each}
</div>
