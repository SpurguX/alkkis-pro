"Use strict";

import { SHOW_CHANGE_PASSWORD_MODAL, HIDE_CHANGE_PASSWORD_MODAL } from '../actions';

export default function (state = { show: false }, action) {
    switch (action.type) {
        case SHOW_CHANGE_PASSWORD_MODAL:
            return { show: true };
        case HIDE_CHANGE_PASSWORD_MODAL:
            return { show: false };
        default:
            return state;
    }
}
