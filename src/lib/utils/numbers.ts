/**
 * Formats a number with thousands separators (commas)
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: based on the input)
 * @returns Formatted string with thousands separators
 */
export function formatNumber(value: number, decimals?: number): string {
	// Handle NaN and Infinity
	if (!Number.isFinite(value)) {
		return value.toString();
	}

	// Determine how many decimal places to show
	const fixedNum = decimals !== undefined ? value.toFixed(decimals) : value.toString();

	// Split into integer and decimal parts
	const parts = fixedNum.split('.');

	// Format the integer part with commas as separators
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	// Join with decimal point if there's a decimal part
	return parts.length > 1 ? parts.join('.') : parts[0];
}
