<script lang="ts">
	import CheckCircleIcon from '$lib/components/heroicons/outline/CheckCircleIcon.svelte';
	import ExclamationTriangleIcon from '$lib/components/heroicons/outline/ExclamationTriangleIcon.svelte';
	import Link from '$lib/components/Link.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import {
		formatBytes,
		persist,
		showEstimatedQuota,
		tryPersistWithoutPromtingUser
	} from '$lib/utils/storage';
</script>

<section class="flex flex-col gap-8">
	<h2 class="text-2xl font-medium">Data</h2>
	{#await showEstimatedQuota()}
		<p>Loading...</p>
	{:then estimatedQuota}
		{#if estimatedQuota && estimatedQuota.quota && estimatedQuota.usage}
			{@const usagePercentage = Math.round((estimatedQuota.usage / estimatedQuota.quota) * 100)}
			<div>Prioritizationator stores all data offline in your browser.</div>
			<div class="flex flex-col gap-2">
				<div class="text-main-500 dark:text-main-400">
					<span class="text-main-700 dark:text-main-300 font-medium">
						{formatBytes(estimatedQuota.usage)} ({usagePercentage}%)
					</span>
					<span>used of your browser's</span>
					<span class="text-main-700 dark:text-main-300 font-medium">
						{formatBytes(estimatedQuota.quota)}
					</span>
					<span>quota.</span>
				</div>
				<ProgressBar progress={estimatedQuota.usage} total={estimatedQuota.quota} size="lg" />
			</div>
			<div
				class="border-main-200 dark:border-main-800 flex items-center gap-6 rounded-lg border p-6"
			>
				{#await tryPersistWithoutPromtingUser()}
					<p>Loading...</p>
				{:then result}
					{#if result === 'persisted'}
						<CheckCircleIcon class="size-12 shrink-0 text-green-600" />
						<p>
							Your data is persisted and it shouldn't be deleted by the browser unless you delete it
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
								</Link> when your device needs to make space.
							</p>
							{#if result === 'prompt'}
								<p>Consider enabling persistent storage to prevent this from happening.</p>
								<Button
									variant="primary"
									onclick={async () => {
										try {
											await persist();
										} catch (error) {
											console.error('Error requesting storage persistence:', error);
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
