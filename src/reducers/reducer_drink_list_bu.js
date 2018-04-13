import { POPULATE_DRINK_LIST_BU, EMPTY_DRINK_LIST_BU } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
    case POPULATE_DRINK_LIST_BU:
       console.log("POPULATE_DRINK_LIST_BU")
        return action.payload;
    case EMPTY_DRINK_LIST_BU:
        return {};
    default:
        return state;
    }
}