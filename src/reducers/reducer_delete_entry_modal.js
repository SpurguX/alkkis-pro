import { SHOW_DELETE_ENTRY_MODAL, HIDE_DELETE_ENTRY_MODAL } from '../actions';

export default function (state = {show: false}, action) {
    switch (action.type) {
        case SHOW_DELETE_ENTRY_MODAL:
            return {show: true, entry: action.payload};
        case HIDE_DELETE_ENTRY_MODAL:
            return {show: false};
        default:
            return state;
    }
}