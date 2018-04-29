export function countUnits(volume, alc_content) {
	const ethanolDensity = 789;
	return volume * (alc_content / 100) * ethanolDensity / 12.00;
}