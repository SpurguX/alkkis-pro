import { UPDATE_DRINK_DATE } from '../actions';

export default function (state = new Date(), action) {
    switch (action.type) {
        case UPDATE_DRINK_DATE:
            return action.payload;
        default:
            return state;
    }
}
