import { FETCH_DRINKS } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_DRINKS:
            return _.mapKeys(action.payload.data, 'drink_id');
        default:
            return state;
    }
}