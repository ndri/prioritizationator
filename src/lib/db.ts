import { argMin, range } from '$lib/utils/array';
import { calculateDraw, calculateWin } from './utils/ratings';
import Dexie, { type EntityTable } from 'dexie';

export interface Project {
	id: number;
	name: string;
	createdAt: Date;
	modifiedAt: Date;
}

export interface ProjectWithTasks extends Project {
	tasks: Task[];
}

export interface Task {
	id: number;
	projectId: number;
	name: string;
	complete: boolean;
	valueRating: number;
	valueRatings: number;
	easeRating: number;
	easeRatings: number;
	createdAt: Date;
	modifiedAt: Date;
	completedAt?: Date;
}

class PrioritizationatorDB extends Dexie {
	projects!: EntityTable<Project, 'id'>;
	tasks!: EntityTable<Task, 'id'>;

	constructor() {
		super('Prioritizationator');

		this.version(1).stores({
			projects: '++id, name, createdAt, modifiedAt',
			tasks:
				'++id, projectId, name, complete, valueRating, valueRatings, easeRating, easeRatings, createdAt, modifiedAt, completedAt'
		});
	}
}

export const db = new PrioritizationatorDB();

export async function getProjects() {
	return db.projects.toArray();
}

export async function getProjectsWithTasks(): Promise<ProjectWithTasks[]> {
	const projects = await db.projects.toArray();
	const allTasks = await db.tasks.toArray();
	return projects.map((project) => ({
		...project,
		tasks: allTasks.filter((task) => task.projectId === project.id)
	}));
}

export async function getProject(id: number) {
	const project = await db.projects.where({ id }).first();

	if (!project) return;

	const tasks = await getProjectTasks(project.id);
	return { ...project, tasks };
}

export async function createProject({ name }: { name: string }) {
	return db.projects.add({ name, createdAt: new Date(), modifiedAt: new Date() });
}

export async function deleteProject(id: number) {
	const tasks = await db.tasks.where({ projectId: id }).toArray();
	for (const task of tasks) {
		await db.tasks.delete(task.id);
	}
	return db.projects.delete(id);
}

export async function editProjectName(id: number, name: string) {
	return db.projects.update(id, { name, modifiedAt: new Date() });
}

export async function getProjectTasks(projectId: number) {
	return db.tasks.where({ projectId }).toArray();
}

export async function getTask(id: number) {
	return db.tasks.where({ id }).first();
}

export async function createTask({ name, projectId }: { name: string; projectId: number }) {
	return db.tasks.add({
		name,
		projectId,
		complete: false,
		valueRating: 50.0,
		valueRatings: 0,
		easeRating: 50.0,
		easeRatings: 0,
		createdAt: new Date(),
		modifiedAt: new Date()
	});
}

export async function deleteTask(id: number) {
	return db.tasks.delete(id);
}

export async function editTaskName(id: number, name: string) {
	return db.tasks.update(id, { name, modifiedAt: new Date() });
}

export async function markTaskComplete(id: number, complete: boolean) {
	if (complete) {
		return db.tasks.update(id, { complete, completedAt: new Date() });
	}
	return db.tasks.update(id, { complete });
}

export async function getTaskPair(projectId: number, dimension: 'value' | 'ease') {
	const ratingField = (dimension + 'Rating') as 'valueRating' | 'easeRating';

	const tasks = await db.tasks
		.where({ projectId })
		.filter((task) => task.complete === false)
		.sortBy(ratingField);

	const differences = range(0, tasks.length - 2).map((index) => ({
		task1: tasks[index],
		task2: tasks[index + 1],
		ratingDifference: tasks[index + 1][ratingField] - tasks[index][ratingField]
	}));

	const smallestDifference = argMin(differences, 'ratingDifference');
	if (!smallestDifference) return;

	const { task1, task2 } = smallestDifference;
	return [task1, task2];
}

async function recordMatchup(
	taskId1: number,
	taskId2: number,
	ratingField: 'valueRating' | 'easeRating',
	ratingsField: 'valueRatings' | 'easeRatings',
	result: 'win' | 'draw'
) {
	const task1 = await getTask(taskId1);
	if (!task1) throw `Task ${taskId1} not found.`;
	const task2 = await getTask(taskId2);
	if (!task2) throw `Task ${taskId2} not found.`;

	if (task1.projectId !== task2.projectId)
		throw `Tasks ${taskId1} and ${taskId2} are not in the same project.`;

	const { newRating1, newRating2 } =
		result === 'win'
			? calculateWin(task1[ratingField], task2[ratingField])
			: calculateDraw(task1[ratingField], task2[ratingField]);

	await db.tasks.update(taskId1, {
		[ratingField]: newRating1,
		[ratingsField]: task1[ratingsField] + 1
	});

	await db.tasks.update(taskId2, {
		[ratingField]: newRating2,
		[ratingsField]: task2[ratingsField] + 1
	});
}

export async function recordValueMatchupWin(taskId1: number, taskId2: number) {
	return recordMatchup(taskId1, taskId2, 'valueRating', 'valueRatings', 'win');
}

export async function recordValueMatchupDraw(taskId1: number, taskId2: number) {
	return recordMatchup(taskId1, taskId2, 'valueRating', 'valueRatings', 'draw');
}

export async function recordEaseMatchupWin(taskId1: number, taskId2: number) {
	return recordMatchup(taskId1, taskId2, 'easeRating', 'easeRatings', 'win');
}

export async function recordEaseMatchupDraw(taskId1: number, taskId2: number) {
	return recordMatchup(taskId1, taskId2, 'easeRating', 'easeRatings', 'draw');
}

export async function resetRatings(projectId: number) {
	const tasks = await db.tasks.where({ projectId }).toArray();
	tasks.forEach(async (task) => {
		await db.tasks.update(task.id, {
			valueRating: 50.0,
			valueRatings: 0,
			easeRating: 50.0,
			easeRatings: 0
		});
	});
}
