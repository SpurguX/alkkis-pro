import React, { useEffect, useRef } from "react";
import { REMOVE_SNACKBAR } from '../actions/'

import { useDispatch } from 'react-redux'

export const Snackbar = (props) => {
  const dispatch = useDispatch();
  const snackbar = useRef(null);
  const timeout = props.timeout || 4000;

  useEffect(() => {
    setTimeout(() => {
      snackbar.current.className += ' alkkis-snackbar--disappearing'

      setTimeout(() => {
        try {
          dispatch({
            type: REMOVE_SNACKBAR,
            payload: props.id
          })
        } catch (error) {
          console.log('error :>> ', error);
        }
      }, 500)
    }, timeout)
  }, [])

  return (
    <div className="alkkis-snackbar" id={props.id} ref={snackbar}>
      <div className="alkkis-snackbar__text font-christmas">{props.text}</div>
    </div>
  );
}
