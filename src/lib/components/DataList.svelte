<script lang="ts">
	interface Props {
		data: {
			key: string;
			value: string;
		}[];
	}

	const { data }: Props = $props();
</script>

<dl class="divide-main-200 dark:divide-main-700 flex flex-col divide-y">
	{#each data as datum}
		<div class="flex justify-between gap-2 py-4">
			<dt class="text-main-500 dark:text-main-400">{datum.key}</dt>
			<dd class="font-medium">{datum.value}</dd>
		</div>
	{/each}
</dl>
