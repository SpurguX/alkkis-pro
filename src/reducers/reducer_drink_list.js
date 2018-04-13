import { UPDATE_JUOMALISTA_STATE, EMPTY_DRINK_LIST, DECREASE_QUANTITY, POPULATE_DRINK_LIST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
    case UPDATE_JUOMALISTA_STATE:
        let { juoma_id } = action.payload;
        if (Object.keys(state).includes(juoma_id.toString())) {
            let modifiedDrinkObject = _.get(state, juoma_id);
            modifiedDrinkObject.quantity++;
            return {...state, [juoma_id] : modifiedDrinkObject};
        } else {
            return {...state, [juoma_id] : {...action.payload, 'quantity': 1}} 
        }
    case DECREASE_QUANTITY:
        let juoma_id2 = action.payload.juoma_id;
        let modifiedDrinkObject = _.get(state, juoma_id2);
        modifiedDrinkObject.quantity--;
        state = _.omit(state, juoma_id2);      
        if (modifiedDrinkObject.quantity < 1) {
            return state;
        } else {
            return {...state, [juoma_id2] : modifiedDrinkObject};
        }
    case EMPTY_DRINK_LIST:
        return {};
    case POPULATE_DRINK_LIST:
        return action.payload;
    default:
        return state;
    }
}