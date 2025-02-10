export function range(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function sum(array: number[]): number {
	return array.reduce((a, b) => a + b, 0);
}

export function randomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}
