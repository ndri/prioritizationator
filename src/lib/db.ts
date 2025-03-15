import { randomElement } from '$lib/utils/array';
import { score0to100 } from './utils/scoring';
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
	valueWins: number;
	valueLosses: number;
	valueTies: number;
	valueScore?: number;
	valueVotes?: number;
	easeWins: number;
	easeLosses: number;
	easeTies: number;
	easeScore?: number;
	easeVotes?: number;
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
				'++id, projectId, name, complete, valueWins, valueLosses, valueTies, *valueScore, *valueVotes, easeWins, easeLosses, easeTies, *easeScore, *easeVotes, createdAt, modifiedAt, completedAt'
		});

		this.tasks.hook('reading', (task: Task) => {
			if (task) {
				task.valueScore = score0to100(task.valueWins, task.valueLosses);
				task.valueVotes = task.valueWins + task.valueLosses + task.valueTies;
				task.easeScore = score0to100(task.easeWins, task.easeLosses);
				task.easeVotes = task.easeWins + task.easeLosses + task.easeTies;
			}
			return task;
		});

		this.tasks.hook('creating', (primKey: number, task: Task) => {
			task.valueScore = score0to100(task.valueWins, task.valueLosses);
			task.valueVotes = task.valueWins + task.valueLosses + task.valueTies;
			task.easeScore = score0to100(task.easeWins, task.easeLosses);
			task.easeVotes = task.easeWins + task.easeLosses + task.easeTies;
		});

		this.tasks.hook('updating', (modifications: Partial<Task>, primKey: number, task: Task) => {
			if (
				modifications.valueWins !== undefined ||
				modifications.valueLosses !== undefined ||
				modifications.valueTies !== undefined
			) {
				const valueWins = modifications.valueWins ?? task.valueWins;
				const valueLosses = modifications.valueLosses ?? task.valueLosses;
				const valueTies = modifications.valueTies ?? task.valueTies;
				modifications.valueScore = score0to100(valueWins, valueLosses);
				modifications.valueVotes = valueWins + valueLosses + valueTies;
			}

			if (
				modifications.easeWins !== undefined ||
				modifications.easeLosses !== undefined ||
				modifications.easeTies !== undefined
			) {
				const easeWins = modifications.easeWins ?? task.easeWins;
				const easeLosses = modifications.easeLosses ?? task.easeLosses;
				const easeTies = modifications.easeTies ?? task.easeTies;
				modifications.easeScore = score0to100(easeWins, easeLosses);
				modifications.easeVotes = easeWins + easeLosses + easeTies;
			}
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
		valueWins: 0,
		valueLosses: 0,
		valueTies: 0,
		easeWins: 0,
		easeLosses: 0,
		easeTies: 0,
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

export async function getTaskPair(
	projectId: number,
	sortBy: 'value' | 'ease',
	avoidTasks: number[] = []
) {
	const tasks = await db.tasks
		.where({ projectId })
		.filter((task) => !avoidTasks.includes(task.id))
		.sortBy(sortBy + 'Votes');

	const leastVotesTask = tasks[0];
	const otherTasks = tasks.slice(1);
	const randomTask = randomElement(otherTasks);

	return [leastVotesTask, randomTask];
}

export async function recordValueWin(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { valueWins: task.valueWins + 1 });
}

export async function recordValueLoss(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { valueLosses: task.valueLosses + 1 });
}

export async function recordValueTie(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { valueTies: task.valueTies + 1 });
}

export async function recordEaseWin(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { easeWins: task.easeWins + 1 });
}

export async function recordEaseLoss(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { easeLosses: task.easeLosses + 1 });
}

export async function recordEaseTie(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { easeTies: task.easeTies + 1 });
}

export async function resetRatings(projectId: number) {
	const tasks = await db.tasks.where({ projectId }).toArray();
	tasks.forEach(async (task) => {
		await db.tasks.update(task.id, {
			valueWins: 0,
			valueLosses: 0,
			valueTies: 0,
			easeWins: 0,
			easeLosses: 0,
			easeTies: 0
		});
	});
}
