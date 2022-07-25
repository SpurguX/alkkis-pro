"Use strict";

import { SAVE_CURRENT_SCREEN_SIZE } from '../actions';

export default function (state = { smallScreen: false }, action) {
    switch (action.type) {
        case SAVE_CURRENT_SCREEN_SIZE:
            return action.payload;
        default:
            return state;
    }
}
