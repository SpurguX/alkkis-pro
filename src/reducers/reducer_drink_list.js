import { UPDATE_JUOMALISTA_STATE, EMPTY_DRINK_LIST, DECREASE_QUANTITY, POPULATE_DRINK_LIST } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case UPDATE_JUOMALISTA_STATE:
            let { drink_id } = action.payload;
            if (Object.keys(state).includes(drink_id.toString())) {
                let modifiedDrinkObject = _.get(state, drink_id);
                modifiedDrinkObject.quantity++;
                return { ...state, [drink_id]: modifiedDrinkObject };
            } else {
                return { ...state, [drink_id]: { ...action.payload, 'quantity': 1 } }
            }
        case DECREASE_QUANTITY:
            let drink_id2 = action.payload.drink_id;
            let modifiedDrinkObject = _.get(state, drink_id2);
            modifiedDrinkObject.quantity--;
            state = _.omit(state, drink_id2);
            if (modifiedDrinkObject.quantity < 1) {
                return state;
            } else {
                return { ...state, [drink_id2]: modifiedDrinkObject };
            }
        case EMPTY_DRINK_LIST:
            return {};
        case POPULATE_DRINK_LIST:
            return action.payload;
        default:
            return state;
    }
}