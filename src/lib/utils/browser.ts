export function downloadJSON(data: any, filename: string) {
	const jsonString = JSON.stringify(data);
	const blob = new Blob([jsonString], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

export async function uploadTextFile(accept = '*/*') {
	return new Promise<string>((resolve, reject) => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = accept;

		input.addEventListener('change', (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = async (e) => {
				const data = e.target?.result;
				if (data && typeof data === 'string' && data.length > 0) {
					resolve(data);
				} else {
					reject('No data found');
				}
			};
			reader.onerror = (e) => {
				reject('Error reading file');
			};
			reader.readAsText(file);
		});

		input.click();
	});
}
