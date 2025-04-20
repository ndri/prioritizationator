<script lang="ts">
	import DataList from '$lib/components/DataList.svelte';
	import CheckCircleIcon from '$lib/components/heroicons/outline/CheckCircleIcon.svelte';
	import ExclamationTriangleIcon from '$lib/components/heroicons/outline/ExclamationTriangleIcon.svelte';
	import Link from '$lib/components/Link.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { countAllData } from '$lib/db';
	import { stateQuery } from '$lib/stateQuery.svelte';
	import { formatNumber } from '$lib/utils/numbers';
	import {
		formatBytes,
		persist,
		showEstimatedQuota,
		tryPersistWithoutPromtingUser
	} from '$lib/utils/storage';

	const countsQuery = stateQuery(countAllData);
	const counts = $derived(countsQuery.current);
</script>

<section class="flex flex-col gap-8">
	<h2 class="text-2xl font-medium">Data</h2>
	<div>Prioritizationator stores all data offline in your browser.</div>
	{#if counts}
		<section class="flex flex-col gap-4">
			<h3 class="text-xl font-medium">Summary</h3>
			<DataList
				data={[
					{
						key: 'Number of projects',
						value: formatNumber(counts.projects)
					},
					{
						key: 'Number of tasks',
						value: formatNumber(counts.tasks)
					},
					{
						key: 'Number of tasks blocking other tasks',
						value: formatNumber(counts.blockings)
					}
				]}
			/>
		</section>
	{/if}

	<section class="flex flex-col gap-4">
		<h3 class="text-xl font-medium">Storage</h3>
		{#await showEstimatedQuota()}
			<p>Loading...</p>
		{:then estimatedQuota}
			{#if estimatedQuota && estimatedQuota.quota && estimatedQuota.usage}
				{@const usagePercentage = Math.round((estimatedQuota.usage / estimatedQuota.quota) * 100)}
				<div class="flex flex-col gap-2">
					<div>
						<span class="font-medium">
							{formatBytes(estimatedQuota.usage)} ({usagePercentage}%)
						</span>
						<span class="text-main-500 dark:text-main-400">used of your browser's</span>
						<span class="font-medium">
							{formatBytes(estimatedQuota.quota)}
						</span>
						<span class="text-main-500 dark:text-main-400">quota.</span>
					</div>
					<ProgressBar progress={estimatedQuota.usage} total={estimatedQuota.quota} size="lg" />
				</div>
			{:else}
				<p>Unable to estimate storage.</p>
				<p>
					Your browser might not support the <Link
						href="https://developer.mozilla.org/en-US/docs/Web/API/StorageManager"
						newTab
					>
						StorageManager API
					</Link>.
				</p>
				<p>Consider upgrading your web browser.</p>
			{/if}
		{/await}
	</section>
	<section class="flex flex-col gap-4">
		<h3 class="text-xl font-medium">Persistence</h3>
		<div
			class={[
				'flex max-w-lg items-center gap-6 rounded-lg border p-6',
				'border-main-200 dark:border-main-800 bg-main-50 dark:bg-main-900 '
			]}
		>
			{#await tryPersistWithoutPromtingUser()}
				<p>Loading...</p>
			{:then result}
				{#if result === 'persisted'}
					<CheckCircleIcon class="size-12 shrink-0 text-green-600" />
					<p>
						Your data is persisted and it won't be deleted by the browser unless you delete it
						manually.
					</p>
				{:else if result === 'prompt' || result === 'never'}
					<ExclamationTriangleIcon class="text-main-400 dark:text-main-500 size-12 shrink-0" />
					<div class="flex flex-col items-start gap-4">
						<p>
							Your data <Link
								href="https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#does_browser-stored_data_persist"
								newTab
							>
								might be deleted
							</Link> when your device needs to make space for something else.
						</p>
						{#if result === 'prompt'}
							<Button
								variant="primary"
								onclick={async () => {
									const success = await persist();
									if (!success) {
										alert(
											'Your browser did not allow enabling persistent storage. Try to use the app some more and then try again.'
										);
									}
								}}
							>
								Enable persistent storage
							</Button>
						{:else}
							<p>Consider upgrading to a web browser that supports persistent storage.</p>
						{/if}
					</div>
				{/if}
			{/await}
		</div>
	</section>
</section>
