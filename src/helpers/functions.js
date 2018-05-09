export function countUnits(volume, alcContent) {
	const ethanolDensity = 789;
	return volume * (alcContent / 100) * ethanolDensity / 12.00;
}