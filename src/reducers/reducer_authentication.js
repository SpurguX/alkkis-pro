'Use strict';

import { SET_AUTH_TOKEN, CLEAR_AUTH_TOKEN } from '../actions';
import _ from 'lodash';

// The token is not saved in store state at all. NB. localStorage is not reactive so make sure you use the latest
// value in the localStorage, not a value that was retrieved earlier into a component that won't update.
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      const token = action.payload
      localStorage.setItem('token', token)
      return {};
    case CLEAR_AUTH_TOKEN:
      localStorage.removeItem('token')
      return {}
    default:
      return state;
  }
}
