import type { Task } from '../db';
import { sum } from './array';

export const minRatings = 4 as const;

export function sortTasks(tasks: Task[]) {
	return tasks.toSorted((a, b) => {
		const aScore = (a.valueScore ?? 1) * (a.easeScore ?? 1);
		const bScore = (b.valueScore ?? 1) * (b.easeScore ?? 1);
		return bScore - aScore;
	});
}

function taskValueIsRated(task: Task) {
	return (task.valueVotes ?? 0) >= minRatings;
}

function taskEaseIsRated(task: Task) {
	return (task.easeVotes ?? 0) >= minRatings;
}

function taskIsRated(task: Task) {
	return taskValueIsRated(task) && taskEaseIsRated(task);
}

function taskIsLowHangingFruit(task: Task) {
	return (task.valueScore ?? 0) > 50 && (task.easeScore ?? 0) > 50;
}

function taskIsTrap(task: Task) {
	return (task.valueScore ?? 0) <= 50 && (task.easeScore ?? 0) <= 50;
}

function taskIsQuickWin(task: Task) {
	return (task.valueScore ?? 0) <= 50 && (task.easeScore ?? 0) > 50;
}

function taskIsLeap(task: Task) {
	return (task.valueScore ?? 0) > 50 && (task.easeScore ?? 0) <= 50;
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
		tasks.filter((task) => !taskValueIsRated(task)).map((task) => task.valueVotes ?? 0)
	);
	return completedRatings + inProgressRatings;
}

export function easeRatingsProgress(tasks: Task[]) {
	const completedRatings = tasks.filter(taskEaseIsRated).length * minRatings;
	const inProgressRatings = sum(
		tasks.filter((task) => !taskEaseIsRated(task)).map((task) => task.easeVotes ?? 0)
	);
	return completedRatings + inProgressRatings;
}
