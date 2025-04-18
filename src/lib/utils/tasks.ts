import { getProjectTasks, type Task, type TaskWithBlockings } from '../db';
import { argMin, range, sum } from './array';

export const minRatings = 3 as const;
export const minTasksForRating = 3 as const;

export function sortTasksByTotalRating(tasks: TaskWithBlockings[]) {
	return tasks.toSorted((a, b) => {
		const aRating = (a.valueRating ?? 1) * (a.easeRating ?? 1);
		const bRating = (b.valueRating ?? 1) * (b.easeRating ?? 1);
		return bRating - aRating;
	});
}

export function sortTasksByRating(
	tasks: TaskWithBlockings[],
	ratingField: 'valueRating' | 'easeRating'
) {
	return tasks.toSorted((a, b) => {
		const aRating = a[ratingField] ?? 1;
		const bRating = b[ratingField] ?? 1;
		return bRating - aRating;
	});
}

export function sortTasksByCompletedAt(tasks: Task[]) {
	return tasks.toSorted((a, b) => {
		const aDate = a.completedAt?.getTime() ?? 0;
		const bDate = b.completedAt?.getTime() ?? 0;
		return bDate - aDate;
	});
}

export function taskValueIsRated(task: Task) {
	return task.valueRatings >= minRatings;
}

export function taskEaseIsRated(task: Task) {
	return task.easeRatings >= minRatings;
}

function taskIsRated(task: Task) {
	return taskValueIsRated(task) && taskEaseIsRated(task);
}

function taskIsLowHangingFruit(task: Task) {
	return task.valueRating > 50 && task.easeRating > 50;
}

function taskIsTrap(task: Task) {
	return task.valueRating <= 50 && task.easeRating <= 50;
}

function taskIsQuickWin(task: Task) {
	return task.valueRating <= 50 && task.easeRating > 50;
}

function taskIsLeap(task: Task) {
	return task.valueRating > 50 && task.easeRating <= 50;
}

export function filterUnratedTasks(tasks: Task[]) {
	return tasks.filter((task) => !taskIsRated(task));
}

export function filterRatedTasks(tasks: Task[]) {
	return tasks.filter(taskIsRated);
}

export function filterLowHangingFruits(tasks: Task[]) {
	return tasks.filter(taskIsLowHangingFruit);
}

export function filterTraps(tasks: Task[]) {
	return tasks.filter(taskIsTrap);
}

export function filterQuickWins(tasks: Task[]) {
	return tasks.filter(taskIsQuickWin);
}

export function filterLeaps(tasks: Task[]) {
	return tasks.filter(taskIsLeap);
}

export function filterIncompleteTasks(tasks: TaskWithBlockings[]) {
	return tasks.filter((task) => !task.complete);
}

export function filterCompletedTasks(tasks: TaskWithBlockings[]) {
	return tasks.filter((task) => task.complete);
}

export function filterBlockedTasks(tasks: TaskWithBlockings[]) {
	return tasks.filter((task) => task.blockedBy.length > 0);
}

export function filterUnblockedTasks(tasks: TaskWithBlockings[]) {
	return tasks.filter((task) => task.blockedBy.length === 0);
}

export function filterDoableTasks(tasks: TaskWithBlockings[]) {
	return filterIncompleteTasks(filterUnblockedTasks(tasks));
}

export function taskColorClasses(task: Task) {
	if (taskIsLowHangingFruit(task))
		return 'bg-accent-500/80 hover:bg-accent-600/80 dark:bg-accent-700/80 dark:hover:bg-accent-600/80';
	if (taskIsQuickWin(task) || taskIsLeap(task))
		return 'bg-accent-500/50 hover:bg-accent-600/50 dark:bg-accent-700/60 dark:hover:bg-accent-600/60';
	if (taskIsTrap(task))
		return 'bg-accent-500/30 hover:bg-accent-600/30 dark:bg-accent-700/40 dark:hover:bg-accent-600/40';
	return 'bg-main-700 hover:bg-main-600 dark:bg-main-800 dark:hover:bg-main-700';
}

export function ratingsRequired(tasks: TaskWithBlockings[]) {
	const unblockedTasks = filterUnblockedTasks(tasks);
	return unblockedTasks.length * minRatings;
}

export function valueRatingsProgress(tasks: TaskWithBlockings[]) {
	const unblockedTasks = filterUnblockedTasks(tasks);
	const completedRatings = unblockedTasks.filter(taskValueIsRated).length * minRatings;
	const inProgressRatings = sum(
		unblockedTasks.filter((task) => !taskValueIsRated(task)).map((task) => task.valueRatings)
	);
	return completedRatings + inProgressRatings;
}

export function easeRatingsProgress(tasks: TaskWithBlockings[]) {
	const unblockedTasks = filterUnblockedTasks(tasks);
	const completedRatings = unblockedTasks.filter(taskEaseIsRated).length * minRatings;
	const inProgressRatings = sum(
		unblockedTasks.filter((task) => !taskEaseIsRated(task)).map((task) => task.easeRatings)
	);
	return completedRatings + inProgressRatings;
}

export function tasksReadyForRating(tasks: TaskWithBlockings[]) {
	const incompleteTasks = filterIncompleteTasks(tasks);
	const unblockedIncompleteTasks = filterUnblockedTasks(incompleteTasks);
	return unblockedIncompleteTasks.length >= minTasksForRating;
}

export async function getTaskPair(
	projectId: number,
	dimension: 'value' | 'ease',
	avoidTasks: number[] = []
) {
	const ratingField = (dimension + 'Rating') as 'valueRating' | 'easeRating';

	const allTasks = await getProjectTasks(projectId);
	const filteredTasks = allTasks.filter((task) => !avoidTasks.includes(task.id));
	const incompleteTasks = filterIncompleteTasks(filteredTasks);
	const unblockedTasks = filterUnblockedTasks(incompleteTasks);
	const tasks = sortTasksByRating(unblockedTasks, ratingField);

	if (tasks.length < 2) return;

	const differences = range(0, tasks.length - 2).map((index) => ({
		task1: tasks[index],
		task2: tasks[index + 1],
		ratingDifference: tasks[index][ratingField] - tasks[index + 1][ratingField]
	}));

	const isRated = dimension === 'value' ? taskValueIsRated : taskEaseIsRated;
	const differencesWithUnrated = differences.filter(
		(difference) => !isRated(difference.task1) || !isRated(difference.task2)
	);

	// Get the pair with the smallest rating difference
	let smallestDifference;
	if (differencesWithUnrated.length > 0) {
		// Make sure to always include an unrated task
		smallestDifference = argMin(differencesWithUnrated, 'ratingDifference');
	} else {
		// If all tasks are rated, get the pair with the overall smallest rating difference
		smallestDifference = argMin(differences, 'ratingDifference');
	}

	if (!smallestDifference) return;

	const { task1, task2 } = smallestDifference;
	return [task1, task2];
}
