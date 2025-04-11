<script lang="ts">
	import Tab from './Tab.svelte';

	interface Props {
		values: {
			id: string;
			label: string;
		}[];
		selected: string;
	}

	let { values, selected = $bindable() }: Props = $props();
</script>

<div class="flex gap-2">
	{#each values as { id, label } (id)}
		<Tab
			{label}
			active={selected === id}
			onclick={() => {
				selected = id;
			}}
		/>
	{/each}
</div>
