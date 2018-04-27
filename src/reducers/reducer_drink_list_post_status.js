import { POST_DRINK_LIST_OK, POST_DRINK_LIST_FAILURE, POST_DRINK_LIST_CLEAR_STATUS } from '../actions';

export default function (state = { ok: null }, action) {
    console.log(action);
    switch (action.type) {
        case POST_DRINK_LIST_OK:
            return { ok: true };
        case POST_DRINK_LIST_FAILURE:
            return { ok: false };
        case POST_DRINK_LIST_CLEAR_STATUS:
            return { ok: null };
        default:
            return state;
    }
}