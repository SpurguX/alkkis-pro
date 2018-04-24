import { POST_DRINK_LIST_OK, POST_DRINK_LIST_FAILURE, POST_DRINK_LIST_CLEAR_STATUS } from '../actions';

export default function (state = {}, action) {
    console.log(action);
    switch (action.type) {
        case POST_DRINK_LIST_OK:
            return { status: 'OK'};
        case POST_DRINK_LIST_FAILURE:
            return { status: 'FAILURE'};
        case POST_DRINK_LIST_CLEAR_STATUS:
            return {};
        default:
            return state;
    }
}