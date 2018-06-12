import { combineReducers } from 'redux';
import reducerDrinks from './reducer_drinks';
import reducerDrinkList from './reducer_drink_list';
import reducerDrinkListBu from './reducer_drink_list_bu';
import reducerUnitsInList from './reducer_units_in_list';
import reducerDrinkEntries from './reducer_drink_entries';
import reducerDrinkDate from './reducer_drink_date';
import reducerDrinkListPostStatus from './reducer_drink_list_post_status';
import reducerOtherDrinkModal from './reducer_other_drink_modal';
import reducerAddResultModal from './reducer_add_result_modal';
import reducerEditEntryModal from './reducer_edit_entry_modal';
import reducerSavedDrinks from './reducer_saved_drinks';
import reducerDiarySelectedTab from './reducer_diary_selected_tab';

const rootReducer = combineReducers({
    addResultModal: reducerAddResultModal,
    allDrinkEntries: reducerDrinkEntries,
    diarySelectedTab: reducerDiarySelectedTab,
    drinks: reducerDrinks,
    drinkDate: reducerDrinkDate,
    drinkList: reducerDrinkList,
    drinkListBu: reducerDrinkListBu,
    drinkListPostStatus: reducerDrinkListPostStatus,
    editEntryModal: reducerEditEntryModal,
    othDrinkModal: reducerOtherDrinkModal,
    savedDrinks: reducerSavedDrinks,
    unitsInList: reducerUnitsInList, 
});

export default rootReducer;