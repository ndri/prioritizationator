export function createTitle(title?: string | undefined) {
	return `${title ? `${title} • ` : ''}Prioritiztionator`;
}
