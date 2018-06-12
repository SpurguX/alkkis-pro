import { SELECT_DIARY_TAB } from "../actions";
export const allEntriesTab = "allEntriesTab";
export const weeklyViewTab = "weeklyViewTab";
export const monthlyViewTab = "monthlyViewTab";

export default function(state = weeklyViewTab, action) {
  switch (action.type) {
    case SELECT_DIARY_TAB:
      return action.payload;
    default:
      return state;
  }
}
