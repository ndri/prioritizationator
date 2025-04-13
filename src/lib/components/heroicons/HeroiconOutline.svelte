<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { paths, type HeroiconOutline } from './HeroiconOutline';

	interface Props {
		icon: HeroiconOutline;
		class?: ClassValue;
	}

	const { icon, class: className }: Props = $props();

	const path = $derived(paths[icon]);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={['size-6', className]}
	viewBox="0 0 24 24"
	stroke-width="1.5"
	stroke="currentColor"
	aria-hidden="true"
	data-slot="icon"
	fill="none"
>
	{@html path}
</svg>
