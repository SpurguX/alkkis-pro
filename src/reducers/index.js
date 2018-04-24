import { combineReducers } from 'redux';
import reducerDrinks from './reducer_drinks';
import reducerDrinkList from './reducer_drink_list';
import reducerDrinkListBu from './reducer_drink_list_bu';
import reducerUnitsInList from './reducer_units_in_list';
import reducerDrinkEntries from './reducer_drink_entries';
import reducerDrinkDate from './reducer_drink_date';
import reducerDrinkListPostStatus from './reducer_drink_list_post_status';

const rootReducer = combineReducers({
    drinks: reducerDrinks,
    drinkList: reducerDrinkList,
    drinkListBu: reducerDrinkListBu,
    unitsInList: reducerUnitsInList,
    drinkDate: reducerDrinkDate,
    allDrinkEntries: reducerDrinkEntries,
    drinkListPostStatus: reducerDrinkListPostStatus,
});

export default rootReducer;