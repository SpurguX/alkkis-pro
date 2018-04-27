import { SHOW_ADD_RESULT_MODAL, HIDE_ADD_RESULT_MODAL } from '../actions';

export default function (state = {show: false}, action) {
    switch (action.type) {
        case SHOW_ADD_RESULT_MODAL:
            return {show: true};
        case HIDE_ADD_RESULT_MODAL:
            return {show: false};
        default:
            return state;
    }
}