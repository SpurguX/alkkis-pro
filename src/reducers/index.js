import { combineReducers } from 'redux';
import JuomaReducer from './reducer_juomat';
import JuomalistaReducer from './reducer_juomat';

const rootReducer = combineReducers({
    juomat: JuomaReducer,
    juomalista: JuomalistaReducer
})

export default rootReducer;