<script lang="ts">
	import ArrowLeftIcon from './heroicons/mini/ArrowLeftIcon.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		href: string;
		text: string;
	}

	const { href, text }: Props = $props();
</script>

<div>
	<Button variant="text" {href} Icon={ArrowLeftIcon}>
		{text}
	</Button>
</div>
