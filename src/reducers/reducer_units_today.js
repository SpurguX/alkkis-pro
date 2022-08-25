'Use strict';

import { SET_UNITS_TODAY } from '../actions';

export default function (state = 0, action) {
  switch (action.type) {
    case SET_UNITS_TODAY:
      return action.payload;
    default:
      return state;
  }
}
