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

export interface ProjectWithTasksAndBlockings extends Project {
	tasks: TaskWithBlockings[];
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

export interface RatingChange {
	id: number;
	dimension: 'value' | 'ease';
	taskId: number;
	oldRating: number;
	newRating: number;
	createdAt: Date;
}

export interface Matchup {
	id: number;
	dimension: 'value' | 'ease';
	projectId: number;
	ratingChangeId1: number;
	ratingChangeId2: number;
	undone: boolean;
}

class PrioritizationatorDB extends Dexie {
	projects!: EntityTable<Project, 'id'>;
	tasks!: EntityTable<Task, 'id'>;
	taskBlockings!: Table<TaskBlocking, [number, number]>;
	ratingChanges!: EntityTable<RatingChange, 'id'>;
	matchups!: EntityTable<Matchup, 'id'>;

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

		this.version(3).stores({
			ratingChanges: '++id, dimension, taskId, oldRating, newRating, createdAt',
			matchups: '++id, dimension, projectId, ratingChangeId1, ratingChangeId2, undone'
		});
	}
}

export const db = new PrioritizationatorDB();

/* Projects */
export async function getProjects() {
	return db.projects.orderBy('modifiedAt').toArray();
}

export async function getProjectsWithTasks(): Promise<ProjectWithTasks[]> {
	const projects = await getProjects();
	const allTasks = await db.tasks.toArray();
	return projects.map((project) => ({
		...project,
		tasks: allTasks.filter((task) => task.projectId === project.id)
	}));
}

export async function getProjectsWithTasksAndBlockings(): Promise<ProjectWithTasksAndBlockings[]> {
	const projects = await getProjects();
	const allTasks = await db.tasks.toArray();
	const tasksWithBlockings = await addBlockingsToTasks(allTasks);
	return projects.map((project) => ({
		...project,
		tasks: tasksWithBlockings.filter((task) => task.projectId === project.id)
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
	tasks.forEach((task) => deleteTask(task.id));
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

export async function getRecentProjects(limit: number) {
	return db.projects.orderBy('modifiedAt').reverse().limit(limit).toArray();
}

async function updateProjectModifiedAt(projectId: number) {
	return db.projects.update(projectId, { modifiedAt: new Date() });
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
	await updateProjectModifiedAt(projectId);
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
	// Necessary to check whether task exists and to update the project modifiedAt date
	await updateTaskModifiedAt(id);

	const blockings1 = await db.taskBlockings.where('taskId').equals(id).toArray();
	const blockings2 = await db.taskBlockings.where('blockedById').equals(id).toArray();
	const blockings = [...blockings1, ...blockings2];
	blockings.forEach((blocking) => deleteBlocking(blocking.taskId, blocking.blockedById));
	return db.tasks.delete(id);
}

export async function editTaskName(id: number, name: string) {
	await updateTaskModifiedAt(id);
	return db.tasks.update(id, { name });
}

export async function markTaskComplete(id: number, complete: boolean) {
	await updateTaskModifiedAt(id);

	if (complete) {
		return db.tasks.update(id, { complete, completedAt: new Date() });
	}
	return db.tasks.update(id, { complete });
}

async function updateTaskModifiedAt(id: number) {
	const task = await getTask(id);

	if (!task) throw `Task ${id} not found.`;

	await updateProjectModifiedAt(task.projectId);
	return db.tasks.update(id, { modifiedAt: new Date() });
}

/* Matchups */
async function recordMatchup(
	taskId1: number,
	taskId2: number,
	dimension: 'value' | 'ease',
	result: 'win' | 'draw'
) {
	const ratingField = dimension === 'value' ? 'valueRating' : 'easeRating';
	const ratingsField = dimension === 'value' ? 'valueRatings' : 'easeRatings';

	const task1 = await getTask(taskId1);
	if (!task1) throw `Task ${taskId1} not found.`;
	const task2 = await getTask(taskId2);
	if (!task2) throw `Task ${taskId2} not found.`;

	if (task1.projectId !== task2.projectId)
		throw `Tasks ${taskId1} and ${taskId2} are not in the same project.`;

	await updateTaskModifiedAt(taskId1);
	await updateTaskModifiedAt(taskId1);

	const oldRating1 = task1[ratingField];
	const oldRating2 = task2[ratingField];

	const { newRating1, newRating2 } =
		result === 'win' ? calculateWin(oldRating1, oldRating2) : calculateDraw(oldRating1, oldRating2);

	await db.tasks.update(taskId1, {
		[ratingField]: newRating1,
		[ratingsField]: task1[ratingsField] + 1
	});

	await db.tasks.update(taskId2, {
		[ratingField]: newRating2,
		[ratingsField]: task2[ratingsField] + 1
	});

	const ratingChangeId1 = await db.ratingChanges.add({
		dimension,
		taskId: taskId1,
		oldRating: oldRating1,
		newRating: newRating1,
		createdAt: new Date()
	});

	const ratingChangeId2 = await db.ratingChanges.add({
		dimension,
		taskId: taskId2,
		oldRating: oldRating2,
		newRating: newRating2,
		createdAt: new Date()
	});

	await db.matchups.add({
		dimension,
		projectId: task1.projectId,
		ratingChangeId1,
		ratingChangeId2,
		undone: false
	});

	await removeUndoneMatchups(task1.projectId, dimension);
}

export async function recordValueMatchupWin(taskId1: number, taskId2: number) {
	return recordMatchup(taskId1, taskId2, 'value', 'win');
}

export async function recordValueMatchupDraw(taskId1: number, taskId2: number) {
	return recordMatchup(taskId1, taskId2, 'value', 'draw');
}

export async function recordEaseMatchupWin(taskId1: number, taskId2: number) {
	return recordMatchup(taskId1, taskId2, 'ease', 'win');
}

export async function recordEaseMatchupDraw(taskId1: number, taskId2: number) {
	return recordMatchup(taskId1, taskId2, 'ease', 'draw');
}

export async function resetRatings(projectId: number) {
	await updateProjectModifiedAt(projectId);

	const tasks = await db.tasks.where({ projectId }).toArray();
	tasks.forEach(async (task) => {
		await db.tasks.update(task.id, {
			valueRating: 50.0,
			valueRatings: 0,
			easeRating: 50.0,
			easeRatings: 0
		});
	});

	removeAllMatchups(projectId);
}

export async function getUndoableMatchup(projectId: number, dimension: 'value' | 'ease') {
	return db.matchups
		.where({ projectId, dimension })
		.filter((matchup) => !matchup.undone)
		.last();
}

export async function canUndoMatchup(projectId: number, dimension: 'value' | 'ease') {
	const undoableMatchup = await getUndoableMatchup(projectId, dimension);
	return !!undoableMatchup;
}

export async function undoMatchup(projectId: number, dimension: 'value' | 'ease') {
	const matchupToUndo = await getUndoableMatchup(projectId, dimension);
	if (!matchupToUndo) return;

	const ratingChange1 = await db.ratingChanges.get(matchupToUndo.ratingChangeId1);
	const ratingChange2 = await db.ratingChanges.get(matchupToUndo.ratingChangeId2);
	if (!ratingChange1 || !ratingChange2) return;

	const task1 = await getTask(ratingChange1.taskId);
	const task2 = await getTask(ratingChange2.taskId);
	if (!task1 || !task2) return;

	const ratingField = dimension === 'value' ? 'valueRating' : 'easeRating';
	const ratingsField = dimension === 'value' ? 'valueRatings' : 'easeRatings';

	await db.tasks.update(task1.id, {
		[ratingField]: ratingChange1.oldRating,
		[ratingsField]: task1[ratingsField] - 1,
		modifiedAt: new Date()
	});
	await db.tasks.update(task2.id, {
		[ratingField]: ratingChange2.oldRating,
		[ratingsField]: task2[ratingsField] - 1,
		modifiedAt: new Date()
	});
	await db.matchups.update(matchupToUndo.id, { undone: true });

	return {
		task1: {
			oldRating: ratingChange1.newRating,
			newRating: ratingChange1.oldRating
		},
		task2: {
			oldRating: ratingChange2.newRating,
			newRating: ratingChange2.oldRating
		}
	};
}

export async function getRedoableMatchup(projectId: number, dimension: 'value' | 'ease') {
	return db.matchups
		.where({ projectId, dimension })
		.filter((matchup) => matchup.undone)
		.first();
}

export async function canRedoMatchup(projectId: number, dimension: 'value' | 'ease') {
	const redoableMatchup = await getRedoableMatchup(projectId, dimension);
	return !!redoableMatchup;
}

export async function redoMatchup(projectId: number, dimension: 'value' | 'ease') {
	const matchupToRedo = await getRedoableMatchup(projectId, dimension);
	if (!matchupToRedo) return;

	const ratingChange1 = await db.ratingChanges.get(matchupToRedo.ratingChangeId1);
	const ratingChange2 = await db.ratingChanges.get(matchupToRedo.ratingChangeId2);
	if (!ratingChange1 || !ratingChange2) return;

	const task1 = await getTask(ratingChange1.taskId);
	const task2 = await getTask(ratingChange2.taskId);
	if (!task1 || !task2) return;

	const ratingField = dimension === 'value' ? 'valueRating' : 'easeRating';
	const ratingsField = dimension === 'value' ? 'valueRatings' : 'easeRatings';

	await db.tasks.update(task1.id, {
		[ratingField]: ratingChange1.newRating,
		[ratingsField]: task1[ratingsField] + 1,
		modifiedAt: new Date()
	});
	await db.tasks.update(task2.id, {
		[ratingField]: ratingChange2.newRating,
		[ratingsField]: task2[ratingsField] + 1,
		modifiedAt: new Date()
	});
	await db.matchups.update(matchupToRedo.id, { undone: false });

	return {
		task1: {
			oldRating: ratingChange1.oldRating,
			newRating: ratingChange1.newRating
		},
		task2: {
			oldRating: ratingChange2.oldRating,
			newRating: ratingChange2.newRating
		}
	};
}

async function removeUndoneMatchups(projectId: number, dimension: 'value' | 'ease') {
	const matchupsToRemove = await db.matchups
		.where({ projectId, dimension })
		.filter((matchup) => matchup.undone)
		.toArray();

	removeMatchups(matchupsToRemove);
}

async function removeAllMatchups(projectId: number) {
	const matchupsToRemove = await db.matchups.where({ projectId }).toArray();
	removeMatchups(matchupsToRemove);
}

function removeMatchups(matchups: Matchup[]) {
	matchups.forEach(async (matchup) => {
		const ratingChange1 = await db.ratingChanges.get(matchup.ratingChangeId1);
		const ratingChange2 = await db.ratingChanges.get(matchup.ratingChangeId2);
		if (!ratingChange1 || !ratingChange2) return;

		await db.ratingChanges.delete(ratingChange1.id);
		await db.ratingChanges.delete(ratingChange2.id);
		await db.matchups.delete(matchup.id);
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
	const task = await getTask(taskId);
	if (!task) throw `Task ${taskId} not found.`;

	await updateTaskModifiedAt(taskId);

	const currentBlockings = await getTaskIdsBlockingToTask(taskId);
	const newBlockings = blockedByIds.filter((id) => !currentBlockings.includes(id));
	const blockingsToDelete = currentBlockings.filter((id) => !blockedByIds.includes(id));

	await Promise.all(newBlockings.map((blockedById) => createBlocking(taskId, blockedById)));
	await Promise.all(blockingsToDelete.map((blockedById) => deleteBlocking(taskId, blockedById)));
}

export async function markTaskBlockingTo(taskId: number, blockingToIds: number[]) {
	const task = await getTask(taskId);
	if (!task) throw `Task ${taskId} not found.`;

	await updateTaskModifiedAt(taskId);

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

/* Counts */
export async function countAllData() {
	const projects = await db.projects.count();
	const tasks = await db.tasks.count();
	let ratings = 0;
	await db.tasks.each((task) => {
		if (task.valueRatings) ratings += task.valueRatings;
		if (task.easeRatings) ratings += task.easeRatings;
	});
	const blockings = await db.taskBlockings.count();
	return { projects, tasks, ratings, blockings };
}

/* Export and import */
export async function exportDatabase() {
	const projects = await db.projects.toArray();
	const tasks = await db.tasks.toArray();
	const taskBlockings = await db.taskBlockings.toArray();

	return { projects, tasks, taskBlockings };
}

export async function importDatabase(data: {
	projects: Project[];
	tasks: Task[];
	taskBlockings: TaskBlocking[];
}) {
	await db.transaction('rw', db.projects, db.tasks, db.taskBlockings, async () => {
		await db.projects.clear();
		await db.tasks.clear();
		await db.taskBlockings.clear();

		await db.projects.bulkPut(data.projects);
		await db.tasks.bulkPut(data.tasks);
		await db.taskBlockings.bulkPut(data.taskBlockings);
	});
}

export async function deleteAllData() {
	await db.projects.clear();
	await db.tasks.clear();
	await db.taskBlockings.clear();
}
