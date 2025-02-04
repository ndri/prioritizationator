import { score0to100 } from '$lib/utils';
import Dexie, { type EntityTable } from 'dexie';

export interface Project {
	id: number;
	name: string;
}

export interface Task {
	id: number;
	projectId: number;
	name: string;
	wins: number;
	losses: number;
	ties: number;
}

export interface ScoredTask extends Task {
	score: number;
}

const db = new Dexie('Prioritizationator') as Dexie & {
	projects: EntityTable<Project, 'id'>;
	tasks: EntityTable<Task, 'id'>;
};

db.version(1).stores({
	projects: '++id, name',
	tasks: '++id, projectId, name, wins, losses, ties'
});

export { db };

export async function getProjects() {
	return db.projects.toArray();
}

export async function getProjectsWithTasks() {
	const projects = await db.projects.toArray();
	const allTasks = await getAllTasks();
	return projects.map((project) => ({
		...project,
		tasks: allTasks.filter((task) => task.projectId === project.id)
	}));
}

export async function getProject(id: number) {
	const project = await db.projects.where({ id }).first();
	if (project) {
		const tasks = await getProjectTasks(project.id);
		return { ...project, tasks };
	}
	return project;
}

export async function createProject({ name }: { name: string }) {
	return db.projects.add({ name });
}

export async function deleteProject(id: number) {
	const tasks = await db.tasks.where({ projectId: id }).toArray();
	for (const task of tasks) {
		await db.tasks.delete(task.id);
	}
	return db.projects.delete(id);
}

export async function getAllTasks() {
	return (await db.tasks.toArray()).map((task) => ({
		...task,
		score: score0to100(task.wins, task.losses)
	}));
}

export async function getProjectTasks(projectId: number): Promise<ScoredTask[]> {
	return (await db.tasks.where({ projectId }).toArray()).map((task) => ({
		...task,
		score: score0to100(task.wins, task.losses)
	}));
}

export async function getTask(id: number) {
	return db.tasks.where({ id }).first();
}

export async function createTask({ name, projectId }: { name: string; projectId: number }) {
	return db.tasks.add({ name, projectId, wins: 0, losses: 0, ties: 0 });
}

export async function deleteTask(id: number) {
	return db.tasks.delete(id);
}

export async function getTaskPair(projectId: number): Promise<[Task, Task]> {
	const tasks = await db.tasks.where({ projectId }).toArray();
	const sortedByTotalVotes = tasks.toSorted((a, b) => {
		const totalVotesA = a.wins + a.losses + a.ties;
		const totalVotesB = b.wins + b.losses + b.ties;
		return totalVotesB - totalVotesA;
	});
	const leastVotesTask = sortedByTotalVotes[sortedByTotalVotes.length - 1];
	const otherTasks = sortedByTotalVotes.slice(0, sortedByTotalVotes.length - 1);
	const randomTask = otherTasks[Math.floor(Math.random() * otherTasks.length)];

	return [leastVotesTask, randomTask];
}

export async function recordWin(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { wins: task.wins + 1 });
}

export async function recordLoss(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { losses: task.losses + 1 });
}

export async function recordTie(taskId: number) {
	const task = await getTask(taskId);
	if (!task) return;

	return db.tasks.update(taskId, { ties: task.ties + 1 });
}

export async function resetRatings(projectId: number) {
	const tasks = await db.tasks.where({ projectId }).toArray();
	tasks.forEach(async (task) => {
		await db.tasks.update(task.id, { wins: 0, losses: 0, ties: 0 });
	});
}
