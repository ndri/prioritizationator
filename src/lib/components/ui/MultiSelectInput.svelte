<script lang="ts" generics="T">
	import Checkbox from './Checkbox.svelte';

	interface Props {
		id: string;
		name?: string;
		label: string;
		options: { value: T; label: string }[];
		values?: T[];
		hiddenLabel?: boolean;
	}
	let { id, name = id, label, options, values = $bindable(), hiddenLabel }: Props = $props();
</script>

<fieldset class="flex flex-col gap-2">
	<div class={[hiddenLabel ? 'sr-only' : 'text-main-900 text-sm font-medium dark:text-white']}>
		<!-- Styling legends is broken, so wrap with div -->
		<legend>{label}</legend>
	</div>
	<div
		class={[
			'flex max-h-[294px] flex-col overflow-y-auto rounded-md',
			'divide-y divide-solid',
			'bg-main-50 divide-main-200',
			'dark:bg-main-900 dark:divide-main-950'
		]}
	>
		{#each options as option}
			<label class="flex cursor-pointer items-center gap-2 p-3">
				<Checkbox
					id={String(option.value)}
					{name}
					label={option.label}
					checked={values?.includes(option.value) ?? false}
					onchange={(e) => {
						if (e.currentTarget.checked) {
							values = [...(values ?? []), option.value];
						} else {
							values = values?.filter((v) => v !== option.value) ?? [];
						}
					}}
				/>
				<span class="text-main-900 text-sm dark:text-white">{option.label}</span>
			</label>
		{/each}
	</div>
</fieldset>
