<script lang="ts">
	interface Props {
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	}

	const { size = 'md', class: className }: Props = $props();

	const sizeClasses = $derived(
		{
			xs: 'size-4',
			sm: 'size-4',
			md: 'size-4',
			lg: 'size-5',
			xl: 'size-6'
		}[size]
	);
</script>

<svg
	class={['animate-spin', sizeClasses, className]}
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
>
	<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
	<path
		class="opacity-75"
		fill="currentColor"
		d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
	></path>
</svg>
