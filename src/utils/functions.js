import React from 'react';
import _ from 'lodash';

export function countUnits(volume, alcContent) {
	const ethanolDensity = 789;
	return volume * (alcContent / 100) * ethanolDensity / 12.00;
}

export const transformDrinksIntoOptions = (drinks) => {
  const options = _.map(drinks, drink => {
		const { drinkId, drinkName, volume, alcContent } = drink;

		return {
			value: drinkId,
			label: `${drinkName} ${getVolumeDisplayValue(volume)} ${alcContent} %`
		}
	});

	return options;
}

export function formatDBDate(date) {
	let dd = date.substring(8,10);
	if (dd[0] === '0') dd = dd[1];
	let mm = date.substring(5,7);
	if (mm[0] === '0') mm = mm[1];
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

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isEmptyString(string) {
	return string === ''
}

export function getVolumeDisplayValue(volume) {
	return volume > 0.24
    ? `${volume.toLocaleString("fi")} l`
    : `${volume * 100} cl`;
}

export function recursiveTimeout(func, args, times, ms = 50) {
  setTimeout(() => {
    func(...args);
    try {
      if (0 < times) {
        recursiveTimeout(func, args, times - 1, ms)
      }
    } catch (e) {
      console.log('e :>> ', e);
    }
  }, ms)
}

export const sizeOf = value => typeSizes[typeof value](value);

const typeSizes = {
  "undefined": () => 0,
  "boolean": () => 4,
  "number": () => 8,
  "string": item => 2 * item.length,
  "object": item => !item ? 0 : Object
    .keys(item)
    .reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
};

export const formatUnits = (units) => {
	if (typeof units !== 'number') {
		throw new Error('Argument "units" is not of type "number"')
	}

	return units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
