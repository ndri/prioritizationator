// higher k factor = more volatile rating changes
export const defaultKFactor = 512;

/**
 * Private helper function to calculate new Elo ratings
 * @param rating1 Current rating of player 1 (1-100)
 * @param rating2 Current rating of player 2 (1-100)
 * @param outcome1 Outcome for player 1 (1 = win, 0.5 = draw, 0 = loss)
 * @param kFactor K-factor determining maximum rating change
 * @returns Array with new ratings [newRating1, newRating2]
 */
function calculateEloChange(
	rating1: number,
	rating2: number,
	outcome1: number,
	kFactor: number
): [number, number] {
	// Normalize ratings to standard Elo scale (typically 0-2400)
	const normalized1 = rating1 * 24;
	const normalized2 = rating2 * 24;

	// Calculate expected outcome for player 1
	const expected1 = 1 / (1 + Math.pow(10, (normalized2 - normalized1) / 400));
	const expected2 = 1 - expected1;

	// Determine actual outcome for player 2
	const outcome2 = 1 - outcome1;

	// Normalize K-factor for our 0-100 scale
	const normalizedK = kFactor / 24;

	// Calculate rating changes
	const change1 = normalizedK * (outcome1 - expected1);
	const change2 = normalizedK * (outcome2 - expected2);

	// Calculate new ratings, ensuring they stay within 0-100 range
	const newRating1 = Math.max(0, Math.min(100, rating1 + change1));
	const newRating2 = Math.max(0, Math.min(100, rating2 + change2));

	return [newRating1, newRating2];
}

/**
 * Calculate new ratings when one player wins and another loses
 * @param rating1 Current rating of the winner (1-100)
 * @param rating2 Current rating of the loser (1-100)
 * @param kFactor K-factor determining maximum rating change (default: 32)
 * @returns Object containing new ratings for both players
 */
export function calculateWin(
	rating1: number,
	rating2: number,
	kFactor = defaultKFactor
): {
	newRating1: number;
	newRating2: number;
} {
	const [newRating1, newRating2] = calculateEloChange(
		rating1,
		rating2,
		1, // Winner outcome = 1
		kFactor
	);

	return { newRating1, newRating2 };
}

/**
 * Calculate new ratings when two players draw
 * @param rating1 Current rating of player 1 (1-100)
 * @param rating2 Current rating of player 2 (1-100)
 * @param kFactor K-factor determining maximum rating change (default: 32)
 * @returns Object containing new ratings for both players
 */
export function calculateDraw(
	rating1: number,
	rating2: number,
	kFactor = 32
): {
	newRating1: number;
	newRating2: number;
} {
	const [newRating1, newRating2] = calculateEloChange(
		rating1,
		rating2,
		0.5, // Draw outcome = 0.5
		kFactor
	);

	return { newRating1, newRating2 };
}
