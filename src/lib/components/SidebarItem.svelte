<script lang="ts">
	import type { Heroicon } from './heroicons/Heroicon';

	interface Props {
		href: string;
		text: string;
		Icon: Heroicon;
		active: boolean;
	}

	const { href, text, Icon, active }: Props = $props();
</script>

<a
	{href}
	class={[
		'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold',
		active ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600',
		'hover:bg-indigo-100 hover:text-indigo-800',
		active ? 'dark:bg-slate-800 dark:text-indigo-400' : 'dark:text-slate-400',
		'dark:hover:bg-slate-800 dark:hover:text-indigo-400'
	]}
>
	<Icon
		class={[
			active ? 'text-indigo-600' : 'text-slate-400',
			'group-hover:text-indigo-600',
			active ? 'dark:text-indigo-400' : 'dark:text-slate-600',
			'dark:group-hover:text-indigo-400'
		]}
	/>
	{text}
</a>
