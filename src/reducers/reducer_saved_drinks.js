import { FETCH_SAVED_DRINKS } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_SAVED_DRINKS:
            return _.mapKeys(action.payload.data, 'drinkId');
        default:
            return state;
    }
}