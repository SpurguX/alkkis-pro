import { FETCH_JUOMAT } from '../actions';

export default function(state = null, action) {
    switch(action.type) {
    case FETCH_JUOMAT:
        return action.payload;
    default:
        return state;
    }
}