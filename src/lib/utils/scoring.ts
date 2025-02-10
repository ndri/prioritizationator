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
