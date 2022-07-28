'Use strict';

import { SET_AUTH_TOKEN } from '../actions';
import _ from 'lodash';

export default function (state = {
    token: '',
  }, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      console.log('action :>> ', action);
      const token = action.payload
      localStorage.setItem('token', token)
      return { token: token };
    default:
      return state;
  }
}
