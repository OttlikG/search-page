export function filterUndefined(obj) {
	return Object.keys(obj).reduce((acc, curr) => {
		if (obj[curr] !== undefined) {
			acc[curr] = obj[curr]
		}

		return acc
	}, {})
}