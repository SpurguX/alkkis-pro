import { INCREASE_QUANTITY, EMPTY_DRINK_LIST, DECREASE_QUANTITY, POPULATE_DRINK_LIST } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case INCREASE_QUANTITY:
            let { drinkId } = action.payload;
            if (Object.keys(state).includes(drinkId.toString())) {
                let modifiedDrinkObject = _.get(state, drinkId);
                modifiedDrinkObject.quantity++;
                return { ...state, [drinkId]: modifiedDrinkObject };
            } else {
                return { ...state, [drinkId]: { ...action.payload, 'quantity': 1 } }
            }
        case DECREASE_QUANTITY:
            let drinkId2 = action.payload.drinkId;
            let modifiedDrinkObject = _.get(state, drinkId2);
            modifiedDrinkObject.quantity--;
            state = _.omit(state, drinkId2);
            if (modifiedDrinkObject.quantity < 1) {
                return state;
            } else {
                return { ...state, [drinkId2]: modifiedDrinkObject };
            }
        case EMPTY_DRINK_LIST:
            return {};
        case POPULATE_DRINK_LIST:
            return action.payload;
        default:
            return state;
    }
}