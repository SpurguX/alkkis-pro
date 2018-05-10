import React from 'react';
import _ from 'lodash';

export function countUnits(volume, alcContent) {
	const ethanolDensity = 789;
	return volume * (alcContent / 100) * ethanolDensity / 12.00;
}

export function renderDrinksAsOptions(savedDrinks) {
	const options = _.map(savedDrinks, drink => {
		const { drinkId, drinkName, volume, alcContent } = drink;
		return (
			<option key={drinkId} drink_id={drinkId}>
				{drinkName} {volume} l, {alcContent} %
			</option>
		);
	});
	return options;
}