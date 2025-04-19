<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import HeroiconOutline from '../HeroiconOutline.svelte';

	interface Props {
		class?: ClassValue;
	}

	const { class: className }: Props = $props();
</script>

<HeroiconOutline icon="arrow-top-right-on-square" class={className} />
