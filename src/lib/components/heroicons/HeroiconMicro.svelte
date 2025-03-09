<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { paths, type HeroiconMicro } from './HeroiconMicro';

	interface Props {
		icon: HeroiconMicro;
		class?: ClassValue;
	}

	const { icon, class: className }: Props = $props();

	const path = $derived(paths[icon]);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 16 16"
	fill="currentColor"
	aria-hidden="true"
	data-slot="icon"
	class={['size-4', className]}
>
	{@html path}
</svg>
