import { UPDATE_DRINK_FILTER_CONDITIONS } from '../actions';
import { drinkType } from '../utils/constants';

export default function (state = [
    drinkType.MILD,
    drinkType.WINE,
    drinkType.LIQUEUR,
    drinkType.BOOZE
], action) {
    switch (action.type) {
        case UPDATE_DRINK_FILTER_CONDITIONS:
            return action.payload;
        default:
            return state;
    }
}