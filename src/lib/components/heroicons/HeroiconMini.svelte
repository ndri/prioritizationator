<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { paths, type HeroiconMini } from './HeroiconMini';

	interface Props {
		icon: HeroiconMini;
		class?: ClassValue;
	}

	const { icon, class: className }: Props = $props();

	const path = $derived(paths[icon]);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 20 20"
	fill="currentColor"
	aria-hidden="true"
	data-slot="icon"
	class={['size-5', className]}
>
	{@html path}
</svg>
