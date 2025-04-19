<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import HeroiconMicro from '../HeroiconMicro.svelte';

	interface Props {
		class?: ClassValue;
	}

	const { class: className }: Props = $props();
</script>

<HeroiconMicro icon="arrow-top-right-on-square" class={className} />
