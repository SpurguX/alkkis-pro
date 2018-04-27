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

const rootReducer = combineReducers({
    addResultModal: reducerAddResultModal,
    allDrinkEntries: reducerDrinkEntries,
    drinks: reducerDrinks,
    drinkDate: reducerDrinkDate,
    drinkList: reducerDrinkList,
    drinkListBu: reducerDrinkListBu,
    drinkListPostStatus: reducerDrinkListPostStatus,
    othDrinkModal: reducerOtherDrinkModal,
    unitsInList: reducerUnitsInList, 
});

export default rootReducer;