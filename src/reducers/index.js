import { combineReducers } from 'redux';
import reducerDrinks from './reducer_drinks';
import reducerDrinkList from './reducer_drink_list';
import reducerDrinkListBu from './reducer_drink_list_bu';
import reducerUnitsInList from './reducer_units_in_list';
import reducerDrinkEntries from './reducer_drink_entries';

const rootReducer = combineReducers({
    drinks: reducerDrinks,
    drinkList: reducerDrinkList,
    drinkListBu: reducerDrinkListBu,
    unitsInList: reducerUnitsInList,
    allDrinkEntries: reducerDrinkEntries
});

export default rootReducer;