import { COUNT_UNITS_IN_LIST } from '../actions';

export default function(state = 0, action) {
    switch(action.type) {
    case COUNT_UNITS_IN_LIST:
        return action.payload;
    default:
        return state;
    }
}