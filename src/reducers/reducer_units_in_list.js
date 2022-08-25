import { SET_UNITS_IN_LIST } from '../actions';

export default function (state = 0, action) {
    switch (action.type) {
        case SET_UNITS_IN_LIST:
            return action.payload;
        default:
            return state;
    }
}
