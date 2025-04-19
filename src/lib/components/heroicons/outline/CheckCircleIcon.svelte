<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import HeroiconOutline from '../HeroiconOutline.svelte';

	interface Props {
		class?: ClassValue;
	}

	const { class: className }: Props = $props();
</script>

<HeroiconOutline icon="check-circle" class={className} />
