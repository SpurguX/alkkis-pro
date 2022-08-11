"Use strict";

import _ from 'lodash';
import { useSelector } from 'react-redux'
import { Snackbar } from './snackbar';

const SnackbarRenderer = props => {
  const snackbars = useSelector((state) => state.snackbars)

  return (
    <>
    {_.map(snackbars, (snackbar) => {
      return <Snackbar
        text={snackbar.text}
        key={snackbar.id}
        id={snackbar.id}
        />
    })}
    </>
  )
}

export default SnackbarRenderer;
