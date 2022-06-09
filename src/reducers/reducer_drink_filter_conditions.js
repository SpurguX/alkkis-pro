import { UPDATE_DRINK_FILTER_CONDITIONS } from '../actions';
export const MILD = 'MILD';
export const WINE = 'WINE';
export const LIQUEUR = 'LIQUEUR';
export const BOOZE = 'BOOZE'

export default function (state = [MILD, WINE, LIQUEUR, BOOZE], action) {
    switch (action.type) {
        case UPDATE_DRINK_FILTER_CONDITIONS:
            return action.payload;
        default:
            return state;
    }
}