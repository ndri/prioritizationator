import Dexie, { type EntityTable } from 'dexie';

interface Project {
	id: number;
	name: string;
}

const db = new Dexie('Prioritizationator') as Dexie & {
	projects: EntityTable<Project, 'id'>;
};

db.version(1).stores({
	projects: '++id, name'
});

export type { Project };
export { db };
