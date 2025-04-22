<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import HeroiconMini from '../HeroiconMini.svelte';

	interface Props {
		class?: ClassValue;
	}

	const { class: className }: Props = $props();
</script>

<HeroiconMini icon="wrench-screwdriver" class={className} />
