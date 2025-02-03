import Dexie, { type EntityTable } from 'dexie';

interface Project {
	id: number;
	name: string;
}

export type { Project };

const db = new Dexie('Prioritizationator') as Dexie & {
	projects: EntityTable<Project, 'id'>;
};

db.version(1).stores({
	projects: '++id, name'
});

export { db };

export async function getProjects() {
	return db.projects.toArray();
}

export async function getProject(id: number) {
	return db.projects.where({ id }).first();
}

export async function createProject({ name }: { name: string }) {
	return db.projects.add({ name });
}

export async function deleteProject(id: number) {
	return db.projects.delete(id);
}
