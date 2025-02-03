import Dexie, { type EntityTable } from 'dexie';

interface Project {
	id: number;
	name: string;
}

interface Task {
	id: number;
	projectId: number;
	name: string;
}

export type { Project, Task };

const db = new Dexie('Prioritizationator') as Dexie & {
	projects: EntityTable<Project, 'id'>;
	tasks: EntityTable<Task, 'id'>;
};

db.version(1).stores({
	projects: '++id, name',
	tasks: '++id, projectId, name'
});

export { db };

export async function getProjects() {
	return db.projects.toArray();
}

export async function getProject(id: number) {
	const project = await db.projects.where({ id }).first();
	if (project) {
		const tasks = await db.tasks.where({ projectId: project.id }).toArray();
		return { ...project, tasks };
	}
	return project;
}

export async function createProject({ name }: { name: string }) {
	return db.projects.add({ name });
}

export async function deleteProject(id: number) {
	return db.projects.delete(id);
}

export async function createTask({ name, projectId }: { name: string; projectId: number }) {
	return db.tasks.add({ name, projectId });
}

export async function deleteTask(id: number) {
	return db.tasks.delete(id);
}
