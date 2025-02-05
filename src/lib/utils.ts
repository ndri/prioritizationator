import type { Task } from './db';

/**
 * Calculates the score based on wins and losses.
 * Starts at 0.5 and goes up or down based on wins and losses.
 * Examples:
 * - score(0, 0) => 0.5
 * - score(1, 0) => 0.666...
 * - score(0, 1) => 0.333...
 * - score(1, 1) => 0.5
 * - score(2, 1) => 0.75
 * - score(1, 2) => 0.25
 * @param wins The number of wins.
 * @param losses The number of losses.
 * @returns The score of as a number between 0 and 1.
 * @throws {Error} If wins or losses are negative.
 */
export function score(wins: number, losses: number): number {
	if (wins < 0) throw new Error('Wins cannot be negative');
	if (losses < 0) throw new Error('Losses cannot be negative');

	return (wins + 1) / (wins + losses + 2);
}

export function score0to100(wins: number, losses: number): number {
	return Math.round(score(wins, losses) * 100);
}

export function range(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function sum(array: number[]): number {
	return array.reduce((a, b) => a + b, 0);
}

export function randomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export function sortTasks(tasks: Task[]) {
	return tasks.toSorted((a, b) => {
		const aScore = (a.valueScore ?? 1) * (a.easeScore ?? 1);
		const bScore = (b.valueScore ?? 1) * (b.easeScore ?? 1);
		return bScore - aScore;
	});
}

export const minRatings = 5 as const;

export function filterUnratedTasks(tasks: Task[]) {
	return tasks.filter(
		(task) =>
			task.valueWins + task.valueLosses < minRatings || task.easeWins + task.easeLosses < minRatings
	);
}

export function taskValueIsRated(task: Task) {
	return (task.valueVotes ?? 0) >= minRatings;
}

export function taskEaseIsRated(task: Task) {
	return (task.easeVotes ?? 0) >= minRatings;
}

export function taskIsRated(task: Task) {
	return taskValueIsRated(task) && taskEaseIsRated(task);
}

export function filterRatedTasks(tasks: Task[]) {
	return tasks.filter(taskIsRated);
}

export function taskIsLowHangingFruit(task: Task) {
	return (task.valueScore ?? 0) > 50 && (task.easeScore ?? 0) > 50;
}

export function taskIsTrap(task: Task) {
	return (task.valueScore ?? 0) <= 50 && (task.easeScore ?? 0) <= 50;
}

export function taskIsQuickWin(task: Task) {
	return (task.valueScore ?? 0) <= 50 && (task.easeScore ?? 0) > 50;
}

export function taskIsLeap(task: Task) {
	return (task.valueScore ?? 0) > 50 && (task.easeScore ?? 0) <= 50;
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
		return 'bg-indigo-500/50 hover:bg-indigo-600/50 dark:bg-indigo-700/50 dark:hover:bg-indigo-600/50';
	if (taskIsTrap(task))
		return 'bg-indigo-500/20 hover:bg-indigo-600/20 dark:bg-indigo-700/20 dark:hover:bg-indigo-600/20';
	return 'bg-slate-700 hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700';
}

export function taskBubbleSize(task: Task) {
	if (taskIsLowHangingFruit(task)) return 24;
	if (taskIsQuickWin(task) || taskIsLeap(task)) return 20;
	if (taskIsTrap(task)) return 16;
	return 20;
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
