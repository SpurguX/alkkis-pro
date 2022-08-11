import { ADD_SNACKBAR, REMOVE_SNACKBAR } from '../actions';
import { v4 as uuidv4 } from 'uuid';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_SNACKBAR:
            const snackbar = action.payload
            const id = uuidv4();
            snackbar.id = id;
            state[id] = snackbar;
            return Object.assign({}, state);
        case REMOVE_SNACKBAR:
            delete state[action.payload];
            return Object.assign({}, state);
        default:
            return state;
    }
}