import { SELECT_DIARY_TAB } from '../actions';
import { diaryTabs } from '../utils/constants';

export default function(state = diaryTabs.WEEKLY_VIEW_TAB, action) {
  switch (action.type) {
    case SELECT_DIARY_TAB:
      return action.payload;
    default:
      return state;
  }
}
