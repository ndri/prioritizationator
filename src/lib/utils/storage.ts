// Adapted from https://dexie.org/docs/StorageManager

/** Check if storage is persisted already.
  @returns {Promise<boolean>} Promise resolved with true if current origin is
  using persistent storage, false if not, and undefined if the API is not
  present.
*/
export async function isStoragePersisted(): Promise<boolean | undefined> {
	return navigator.storage && navigator.storage.persisted
		? navigator.storage.persisted()
		: undefined;
}

/** Tries to convert to persisted storage.
  @returns {Promise<boolean>} Promise resolved with true if successfully
  persisted the storage, false if not, and undefined if the API is not present.
*/
export async function persist(): Promise<boolean | undefined> {
	console.log('navigator.storage', navigator.storage);
	console.log('navigator.storage.persist', navigator.storage.persist);
	console.log(
		'navigator.storage && navigator.storage.persist',
		navigator.storage && navigator.storage.persist
	);
	return navigator.storage && navigator.storage.persist ? navigator.storage.persist() : undefined;
}

/** Queries available disk quota.
  @see https://developer.mozilla.org/en-US/docs/Web/API/StorageEstimate
  @returns {Promise<{quota: number, usage: number}>} Promise resolved with
  {quota: number, usage: number} or undefined.
*/
export async function showEstimatedQuota(): Promise<StorageEstimate | undefined> {
	return navigator.storage && navigator.storage.estimate ? navigator.storage.estimate() : undefined;
}

/** Tries to persist storage without ever prompting user.
  @returns {Promise<string>}
    "never" In case persisting is not ever possible. Caller don't bother
      asking user for permission.
    "prompt" In case persisting would be possible if prompting user first.
    "persisted" In case this call successfully silently persisted the storage,
      or if it was already persisted.
*/
export async function tryPersistWithoutPromtingUser(): Promise<string> {
	console.log('Trying to persist storage without prompting user...');
	if (!navigator.storage || !navigator.storage.persisted) return 'never';

	let persisted = await navigator.storage.persisted();
	if (persisted) return 'persisted';

	if (!navigator.permissions || !navigator.permissions.query) {
		return 'prompt'; // It MAY be successful to prompt. Don't know.
	}

	let permission;
	try {
		permission = await navigator.permissions.query({
			name: 'persistent-storage'
		});
	} catch (error) {
		// The browser does not support permissions API or persistent-storage permission.
		return 'never';
	}

	if (!permission || permission.state === 'denied') {
		return 'never';
	}

	if (permission.state === 'granted') {
		persisted = await navigator.storage.persist();
		if (persisted) {
			return 'persisted';
		} else {
			throw new Error('Failed to persist');
		}
	}

	if (permission.state === 'prompt') {
		return 'prompt';
	}
	return 'never';
}

/**
 * Converts bytes to a human-readable format with appropriate unit.
 * Uses binary prefixes (base 1024): KiB, MiB, GiB, etc.
 *
 * @param bytes The number of bytes to convert
 * @param decimals Number of decimal places (default: 2)
 * @returns A string representation with appropriate unit
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
	if (bytes === 0) return '0 B';
	if (decimals < 0) decimals = 0;

	const k = 1024;
	const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));
	const unitIndex = Math.min(i, sizes.length - 1);

	return `${parseFloat((bytes / Math.pow(k, unitIndex)).toFixed(decimals))} ${sizes[unitIndex]}`;
}
