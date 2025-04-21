<script lang="ts">
	import Disclosure from '$lib/components/Disclosure.svelte';
	import Link from '$lib/components/Link.svelte';
	import { createTitle } from '$lib/utils/title';
</script>

<svelte:head><title>{createTitle('Help')}</title></svelte:head>

<section class="flex flex-col gap-4">
	<h2 class="text-2xl font-medium">Help</h2>
	<div class="divide-main-200 dark:divide-main-700 flex flex-col divide-y">
		<Disclosure question="How does Prioritizationator work?">
			<p>
				Prioritizationator helps you prioritize tasks by analyzing their value and effort. Here's
				how:
			</p>
			<ol class="mb-3 list-decimal pl-6">
				<li>Create a project and add your tasks.</li>
				<li>Compare pairs of tasks, evaluating their relative value and effort.</li>
				<li>Get tasks automatically sorted into four priority categories.</li>
			</ol>
			<p>The four categories are:</p>
			<ul class="list-disc pl-6">
				<li>
					<strong>Low-hanging fruit:</strong>
					High value, low effort (prioritize these first)
				</li>
				<li>
					<strong>Quick wins:</strong>
					Low value, low effort (easy tasks for momentum)
				</li>
				<li>
					<strong>Leaps:</strong>
					High value, high effort (important but resource-intensive)
				</li>
				<li>
					<strong>Traps:</strong>
					Low value, high effort (generally avoid these)
				</li>
			</ul>
		</Disclosure>
		<Disclosure question="How are scores calculated?">
			<p>
				We use a modified <Link href="https://en.wikipedia.org/wiki/Elo_rating_system" newTab>
					Elo rating system
				</Link> (similar to chess rankings) with scores normalized from 0 to 100. All tasks start at
				50.
			</p>
			<p>Each comparison adjusts scores based on</p>
			<ul class="list-disc pl-6">
				<li>the outcome of your comparison and</li>
				<li>the current score difference between tasks.</li>
			</ul>
			<p>The more comparisons you make, the more accurate and reliable the scores become.</p>
		</Disclosure>
		<Disclosure question={`What do "blocked by" and "blocking to" mean?`}>
			<p>
				<strong>Blocked by:</strong>
				A task that must wait for another task to be completed first.
			</p>
			<p class="mb-3 ml-4 italic">
				Example: Building a house is "blocked by" getting construction permits.
			</p>
			<p>
				<strong>Blocking to:</strong>
				A task that prevents another task from starting.
			</p>
			<p class="mb-3 ml-4 italic">Example: Getting permits is "blocking to" building a house.</p>
			<p>
				When a task is blocked, it can't be prioritized until its blocking tasks are completed. This
				helps you focus on what's actually actionable right now.
			</p>
		</Disclosure>
		<Disclosure question="Where is my data stored?">
			<p>
				Your data is stored locally in your browser using
				<Link href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" newTab>
					IndexedDB
				</Link>. This means
			</p>
			<ul class="list-disc pl-6">
				<li>your data never leaves your device;</li>
				<li>it's accessible only on the device where you created it;</li>
				<li>no servers store your information.</li>
			</ul>
			<p>In the future, you will be able to log in and sync your data across devices.</p>
		</Disclosure>

		<Disclosure question="What is Prioritizationator built with?">
			<p>Prioritizationator is powered by Svelte, SvelteKit, Dexie and Tailwind.</p>
		</Disclosure>
	</div>
</section>
