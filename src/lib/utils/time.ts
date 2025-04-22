/**
 * Formats a date into a human-readable relative time string (e.g., "4d ago")
 * @param date The date to format
 * @param now Optional reference date (defaults to current time)
 * @returns A human-readable relative time string
 */
export function getTimeAgo(date: Date, now: Date = new Date()): string {
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 30) {
		return 'just now';
	} else if (diffInSeconds < 60) {
		return 'less than a minute ago';
	} else if (diffInSeconds < 3600) {
		const minutes = Math.floor(diffInSeconds / 60);
		return `${minutes}m ago`;
	} else if (diffInSeconds < 86400) {
		const hours = Math.floor(diffInSeconds / 3600);
		return `${hours}h ago`;
	} else if (diffInSeconds < 2592000) {
		const days = Math.floor(diffInSeconds / 86400);
		return `${days}d ago`;
	} else if (diffInSeconds < 31536000) {
		const months = Math.floor(diffInSeconds / 2592000);
		return `${months}mo ago`;
	} else {
		const years = Math.floor(diffInSeconds / 31536000);
		return `${years}y ago`;
	}
}
