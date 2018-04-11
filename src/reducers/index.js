import { combineReducers } from 'redux';
import JuomaReducer from './reducer_juomat';
import JuomalistaReducer from './reducer_juomalista';
import DrinkListBuReducer from './reducer_drink_list_bu';

const rootReducer = combineReducers({
    juomat: JuomaReducer,
    juomalista: JuomalistaReducer,
    drinkListBu: DrinkListBuReducer
})

export default rootReducer;