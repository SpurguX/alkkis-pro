"Use strict";

import { FETCH_DRINK_ENTRIES_TODAY } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_DRINK_ENTRIES_TODAY:
      return _.mapKeys(action.payload.data, 'drink_entry_id');
    default:
      return state;
  }
}
