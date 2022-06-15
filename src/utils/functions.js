import React from 'react';
import _ from 'lodash';

export function countUnits(volume, alcContent) {
	const ethanolDensity = 789;
	return volume * (alcContent / 100) * ethanolDensity / 12.00;
}

export function renderDrinksAsOptions(savedDrinks) {
	const options = _.map(savedDrinks, drink => {
		const { drinkId, drinkName } = drink;
		const volume = drink.volume.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
		const alcContent = drink.alcContent.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
		return (
			<option key={drinkId} drink_id={drinkId}>
				{drinkName} {volume} l, {alcContent} %
			</option>
		);
	});
	return options;
}

export function sortEntriesbyDrinkDate(entries) {
	let dateSortedEntries = [];
	Object.keys(entries).forEach((key) => {
			dateSortedEntries.push(entries[key])
	})
	dateSortedEntries.sort(compareDrinkDates);
	return dateSortedEntries;
}

function compareDrinkDates(a, b) {
	if (a.drink_date < b.drink_date) {
			return -1;
	}
	if (a.drink_date > b.drink_date) {
			return 1;
	}
	return 0;
}

export function formatDBDate(date) {
	let dd = date.substring(8,10);
	let mm = date.substring(5,7);
	let yyyy = date.substring(0,4);
	return (`${dd}.${mm}.${yyyy}`);
}

export function formatJSDate(date) {
	let dd = date.getDate()
	let mm = date.getMonth() + 1;
	let yyyy = date.getFullYear();
	return (`${dd}.${mm}.${yyyy}`);
}

export function calculateTotalUnits(entries) {
	let totalUnits = 0.0;
	_.forEach(entries, obj => {
		totalUnits += obj.drink_entry_units;
	});
	return totalUnits;
}

export function styleTabIfActive(thisTab, tabInState) {
	if (tabInState === thisTab) {
		return "alkkis-tab-active";
	}
	return "";
}

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isEmptyString(string) {
	return string === ''
}