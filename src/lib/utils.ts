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

export const minRatings = 3 as const;

export function filterUnratedTasks(tasks: Task[]) {
	return tasks.filter((task) => task.valueWins + task.valueLosses < minRatings);
}

export function filterRatedTasks(tasks: Task[]) {
	return tasks.filter((task) => task.valueWins + task.valueLosses >= minRatings);
}

export function filterLowHangingFruits(tasks: Task[]) {
	return tasks.filter((task) => (task.valueScore ?? 0) > 50 && (task.easeScore ?? 0) > 50);
}

export function filterTraps(tasks: Task[]) {
	return tasks.filter((task) => (task.valueScore ?? 0) <= 50 && (task.easeScore ?? 0) <= 50);
}

export function filterQuickWins(tasks: Task[]) {
	return tasks.filter((task) => (task.valueScore ?? 0) <= 50 && (task.easeScore ?? 0) > 50);
}

export function filterLeaps(tasks: Task[]) {
	return tasks.filter((task) => (task.valueScore ?? 0) > 50 && (task.easeScore ?? 0) <= 50);
}
