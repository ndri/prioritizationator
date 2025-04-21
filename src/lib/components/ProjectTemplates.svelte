<script lang="ts">
	import { goto } from '$app/navigation';
	import { TEMPLATES, type Template } from '$lib/data/templates';
	import { createBlocking, createProject, createTask } from '$lib/db';

	const createProjectFromTemplate = async (template: Template) => {
		const projectId = await createProject({ name: template.name });
		const taskIds = await Promise.all(
			template.tasks.map((task) => createTask({ name: task.name, projectId }))
		);
		const templateTaskIdToTaskIdMap = new Map<number, number>();
		template.tasks.forEach((templateTask, index) => {
			templateTaskIdToTaskIdMap.set(templateTask.id, taskIds[index]);
		});
		await Promise.all(
			template.tasks.map((templateTask) => {
				const taskId = templateTaskIdToTaskIdMap.get(templateTask.id) as number;
				return Promise.all(
					templateTask.blockedBy.map((blockedBy) => {
						const blockedById = templateTaskIdToTaskIdMap.get(blockedBy) as number;
						return createBlocking(taskId, blockedById);
					})
				);
			})
		);
		goto(`/projects/${projectId}/intro/2`);
	};
</script>

<section class="flex flex-col gap-4">
	<h2 class="text-xl font-medium">...or choose a template</h2>
	<p class="text-main-500 dark:text-main-400 text-sm">
		Get started quickly with some pre-selected tasks.
	</p>
	<div class="grid grid-cols-1 gap-3 @lg:grid-cols-2">
		{#each TEMPLATES as template}
			<button
				class={[
					'flex cursor-pointer flex-col items-start justify-between gap-2 rounded-lg border p-5 text-sm',
					'hover:bg-main-50 border-main-200',
					'dark:hover:bg-main-900 dark:border-main-800'
				]}
				onclick={() => createProjectFromTemplate(template)}
			>
				<h3 class="font-medium">{template.name}</h3>
				<p class="text-xs">{template.tasks.length} tasks</p>
			</button>
		{/each}
	</div>
</section>
