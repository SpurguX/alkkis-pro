import { GET_JUOMALISTA_STATE } from '../actions';
import { UPDATE_JUOMALISTA_STATE } from '../actions'
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
    case GET_JUOMALISTA_STATE:
        return state;
    case UPDATE_JUOMALISTA_STATE:
        const { juoma_id } = action.payload;
        if (Object.keys(state).includes(juoma_id.toString())) {
            let modifiedDrinkObject = _.get(state, juoma_id);
            modifiedDrinkObject.quantity++;
            state = _.omit(state, action.payload)
            return {...state, [juoma_id] : modifiedDrinkObject};
        } else {
            return {...state, [juoma_id] : {...action.payload, 'quantity': 1}} 
        }
    default:
        return state;
    }
}