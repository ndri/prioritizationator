import type { Task, TaskWithBlockings } from '../db';
import { sum } from './array';

export const minRatings = 3 as const;
export const minTasksForRating = 5 as const;

export function sortTasksByRating(tasks: TaskWithBlockings[]) {
	return tasks.toSorted((a, b) => {
		const aRating = (a.valueRating ?? 1) * (a.easeRating ?? 1);
		const bRating = (b.valueRating ?? 1) * (b.easeRating ?? 1);
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

export function filterCompletedTasks(tasks: Task[]) {
	return tasks.filter((task) => task.complete);
}

export function filterBlockedTasks(tasks: TaskWithBlockings[]) {
	return tasks.filter((task) => task.blockedBy.length > 0);
}

export function filterUnblockedTasks(tasks: TaskWithBlockings[]) {
	return tasks.filter((task) => task.blockedBy.length === 0);
}

export function taskColorClasses(task: Task) {
	if (taskIsLowHangingFruit(task))
		return 'bg-indigo-500/80 hover:bg-indigo-600/80 dark:bg-indigo-700/80 dark:hover:bg-indigo-600/80';
	if (taskIsQuickWin(task) || taskIsLeap(task))
		return 'bg-indigo-500/50 hover:bg-indigo-600/50 dark:bg-indigo-700/60 dark:hover:bg-indigo-600/60';
	if (taskIsTrap(task))
		return 'bg-indigo-500/30 hover:bg-indigo-600/30 dark:bg-indigo-700/40 dark:hover:bg-indigo-600/40';
	return 'bg-slate-700 hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700';
}

export function ratingsRequired(tasks: Task[]) {
	return tasks.length * minRatings;
}

export function valueRatingsProgress(tasks: Task[]) {
	const completedRatings = tasks.filter(taskValueIsRated).length * minRatings;
	const inProgressRatings = sum(
		tasks.filter((task) => !taskValueIsRated(task)).map((task) => task.valueRatings)
	);
	return completedRatings + inProgressRatings;
}

export function easeRatingsProgress(tasks: Task[]) {
	const completedRatings = tasks.filter(taskEaseIsRated).length * minRatings;
	const inProgressRatings = sum(
		tasks.filter((task) => !taskEaseIsRated(task)).map((task) => task.easeRatings)
	);
	return completedRatings + inProgressRatings;
}

export function tasksReadyForRating(tasks: TaskWithBlockings[]) {
	return filterIncompleteTasks(tasks).length >= minTasksForRating;
}
