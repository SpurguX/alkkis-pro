import { FETCH_JUOMAT } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_JUOMAT:
        return _.mapKeys(action.payload.data, 'juoma_id');
    default:
        return state;
    }
}