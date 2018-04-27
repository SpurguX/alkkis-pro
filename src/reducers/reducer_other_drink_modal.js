import { SHOW_OTH_DRINK_MODAL, HIDE_OTH_DRINK_MODAL } from '../actions';

export default function (state = {show: false}, action) {
    switch (action.type) {
        case SHOW_OTH_DRINK_MODAL:
            return {show: true};
        case HIDE_OTH_DRINK_MODAL:
            return {show: false};
        default:
            return state;
    }
}