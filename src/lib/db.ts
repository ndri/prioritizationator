import { argMin, range } from '$lib/utils/array';
import { calculateDraw, calculateWin } from './utils/ratings';
import Dexie, { type EntityTable, type Table } from 'dexie';

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

export interface TaskWithBlockings extends Task {
	blockedBy: number[];
	blockingTo: number[];
}

export interface TaskBlocking {
	taskId: number;
	blockedById: number;
	createdAt: Date;
}

class PrioritizationatorDB extends Dexie {
	projects!: EntityTable<Project, 'id'>;
	tasks!: EntityTable<Task, 'id'>;
	taskBlockings!: Table<TaskBlocking, [number, number]>;

	constructor() {
		super('Prioritizationator');

		this.version(1).stores({
			projects: '++id, name, createdAt, modifiedAt',
			tasks:
				'++id, projectId, name, complete, valueRating, valueRatings, easeRating, easeRatings, createdAt, modifiedAt, completedAt'
		});

		this.version(2).stores({
			taskBlockings: '[taskId+blockedById], taskId, blockedById, createdAt'
		});
	}
}

export const db = new PrioritizationatorDB();

/* Projects */
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
	const tasks = await db.tasks.where({ projectId }).toArray();
	const tasksWithBlockings = await addBlockingsToTasks(tasks);
	return tasksWithBlockings;
}

export async function getOtherTasksInProject(projectId: number, taskId: number) {
	const tasks = await getProjectTasks(projectId);
	return tasks.filter((task) => task.id !== taskId);
}

/* Tasks */
async function getTask(id: number) {
	return db.tasks.where({ id }).first();
}

async function getTasks(ids: number[]) {
	return db.tasks.bulkGet(ids).then((tasks) => tasks.filter((task) => Boolean(task))) as Promise<
		Task[]
	>;
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

/* Matchups */
export async function getTaskPair(projectId: number, dimension: 'value' | 'ease') {
	const ratingField = (dimension + 'Rating') as 'valueRating' | 'easeRating';

	const tasksWithoutBlockings = await db.tasks
		.where({ projectId })
		.filter((task) => task.complete === false)
		.sortBy(ratingField);

	const tasksWithBlockings = await addBlockingsToTasks(tasksWithoutBlockings);
	const tasks = tasksWithBlockings.filter((task) => task.blockedBy.length === 0);

	if (tasks.length < 2) return;

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

/* Task Blockings */
export async function createBlocking(taskId: number, blockedById: number) {
	return db.taskBlockings.put({ taskId, blockedById, createdAt: new Date() });
}

async function deleteBlocking(taskId: number, blockedById: number) {
	return db.taskBlockings.delete([taskId, blockedById]);
}

async function getTaskBlockingsBlockingToTask(taskId: number) {
	return db.taskBlockings.where({ taskId }).toArray();
}

async function getTasksBlockingToTask(taskId: number) {
	const taskBlockings = await getTaskBlockingsBlockingToTask(taskId);
	const tasksIds = taskBlockings.map((task) => task.blockedById);
	const tasks = await getTasks(tasksIds);
	const incompleteTasks = tasks.filter((task) => task.complete === false);

	return incompleteTasks;
}

export async function getTaskIdsBlockingToTask(taskId: number) {
	const tasks = await getTasksBlockingToTask(taskId);
	return tasks.map((task) => task.id);
}

async function getTaskBlockingsBlockedByTask(blockedById: number) {
	return db.taskBlockings.where({ blockedById }).toArray();
}

async function getTasksBlockedByTask(blockedById: number) {
	const taskBlockings = await getTaskBlockingsBlockedByTask(blockedById);
	const tasksIds = taskBlockings.map((task) => task.taskId);
	const tasks = await getTasks(tasksIds);
	const incompleteTasks = tasks.filter((task) => task.complete === false);

	return incompleteTasks;
}

export async function getTaskIdsBlockedByTask(blockedById: number) {
	const tasks = await getTasksBlockedByTask(blockedById);
	return tasks.map((task) => task.id);
}

export async function markTaskBlockedBy(taskId: number, blockedByIds: number[]) {
	const currentBlockings = await getTaskIdsBlockingToTask(taskId);
	const newBlockings = blockedByIds.filter((id) => !currentBlockings.includes(id));
	const blockingsToDelete = currentBlockings.filter((id) => !blockedByIds.includes(id));

	await Promise.all(newBlockings.map((blockedById) => createBlocking(taskId, blockedById)));
	await Promise.all(blockingsToDelete.map((blockedById) => deleteBlocking(taskId, blockedById)));
}

export async function markTaskBlockingTo(taskId: number, blockingToIds: number[]) {
	const currentBlockings = await getTaskIdsBlockedByTask(taskId);
	const newBlockings = blockingToIds.filter((id) => !currentBlockings.includes(id));
	const blockingsToDelete = currentBlockings.filter((id) => !blockingToIds.includes(id));

	await Promise.all(newBlockings.map((blockedById) => createBlocking(blockedById, taskId)));
	await Promise.all(blockingsToDelete.map((blockedById) => deleteBlocking(blockedById, taskId)));
}

async function addBlockingsToTasks(tasks: Task[]): Promise<TaskWithBlockings[]> {
	if (tasks.length === 0) return [];

	const taskIds = tasks.map((task) => task.id);
	const completedTaskIds = tasks.filter((task) => task.complete).map((task) => task.id);

	const allBlockingsTo = await db.taskBlockings.where('taskId').anyOf(taskIds).toArray();
	const allBlockingsFrom = await db.taskBlockings.where('blockedById').anyOf(taskIds).toArray();

	const blockingsToMap: Record<number, number[]> = {};
	const blockingsFromMap: Record<number, number[]> = {};

	taskIds.forEach((id) => {
		blockingsToMap[id] = [];
		blockingsFromMap[id] = [];
	});

	allBlockingsTo.forEach((blocking) => {
		if (completedTaskIds.includes(blocking.blockedById)) return;
		blockingsToMap[blocking.taskId].push(blocking.blockedById);
	});

	allBlockingsFrom.forEach((blocking) => {
		blockingsFromMap[blocking.blockedById].push(blocking.taskId);
	});

	return tasks.map((task) => ({
		...task,
		blockedBy: blockingsToMap[task.id] ?? [],
		blockingTo: blockingsFromMap[task.id] ?? []
	}));
}
