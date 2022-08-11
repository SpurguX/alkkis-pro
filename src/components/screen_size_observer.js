"Use strict";

import { saveCurrentScreenSize } from '../actions';
import { useDispatch } from 'react-redux'

const ScreenSizeObserver = props => {
  const dispatch = useDispatch();

  dispatch(saveCurrentScreenSize({ smallScreen: !window.matchMedia("(min-width: 768px)").matches }))

  const handleScreenSizeChange = e => dispatch(saveCurrentScreenSize({ smallScreen: !e.matches}));
  window.matchMedia("(min-width: 768px)").addEventListener('change', handleScreenSizeChange);

  return null
}

export default ScreenSizeObserver;
