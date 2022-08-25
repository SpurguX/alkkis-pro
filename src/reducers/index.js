import { combineReducers } from 'redux';
import reducerAuthentication from './reducer_authentication';
import reducerDrinks from './reducer_drinks';
import reducerDrinkFilterConditions from './reducer_drink_filter_conditions';
import reducerDrinkList from './reducer_drink_list';
import reducerDrinkListBu from './reducer_drink_list_bu';
import reducerUnitsInList from './reducer_units_in_list';
import reducerUnitsToday from './reducer_units_today';
import reducerDrinkEntries from './reducer_drink_entries';
import reducerDrinkEntriesToday from './reducer_drink_entries_today';
import reducerDrinkDate from './reducer_drink_date';
import reducerDrinkListPostStatus from './reducer_drink_list_post_status';
import reducerOtherDrinkModal from './reducer_other_drink_modal';
import reducerEditEntryModal from './reducer_edit_entry_modal';
import reducerDeleteEntryModal from './reducer_delete_entry_modal';
import reducerSavedDrinks from './reducer_saved_drinks';
import reducerDiarySelectedTab from './reducer_diary_selected_tab';
import reducerSnackbar from './reducer_snackbar';
import reducerScreenSize from './reducer_screen_size';
import reducerChangePasswordModal from './reducer_change_password_modal';

const rootReducer = combineReducers({
  authentication: reducerAuthentication,
  changePasswordModal: reducerChangePasswordModal,
  deleteEntryModal: reducerDeleteEntryModal,
  diarySelectedTab: reducerDiarySelectedTab,
  drinkDate: reducerDrinkDate,
  drinkEntriesAll: reducerDrinkEntries,
  drinkEntriesToday: reducerDrinkEntriesToday,
  drinkFilterConditions: reducerDrinkFilterConditions,
  drinkList: reducerDrinkList,
  drinkListBu: reducerDrinkListBu,
  drinkListPostStatus: reducerDrinkListPostStatus,
  drinks: reducerDrinks,
  editEntryModal: reducerEditEntryModal,
  othDrinkModal: reducerOtherDrinkModal,
  savedDrinks: reducerSavedDrinks,
  screenSize: reducerScreenSize,
  snackbars: reducerSnackbar,
  unitsInList: reducerUnitsInList,
  unitsToday: reducerUnitsToday,
});

export default rootReducer;
