import axios from 'axios';

export const FETCH_JUOMAT = 'FETCH_JUOMAT';
export const UPDATE_JUOMALISTA_STATE = 'UPDATE_JUOMALISTA_STATE';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const EMPTY_DRINK_LIST = 'EMPTY_DRINK_LIST';
export const POPULATE_DRINK_LIST_BU = 'POPULATE_DRINK_LIST_BU';
export const POPULATE_DRINK_LIST = 'POPULATE_DRINK_LIST';
export const EMPTY_DRINK_LIST_BU = 'EMPTY_DRINK_LIST_BU';
export const COUNT_UNITS_IN_LIST = 'COUNT_UNITS_IN_LIST';
export const POST_DRINK_LIST_OK = 'POST_DRINK_LIST_OK';
export const POST_DRINK_LIST_FAILURE = 'POST_DRINK_LIST_FAILURE';
export const POST_DRINK_LIST_CLEAR_STATUS = 'POST_DRINK_LIST_CLEAR_STATUS'
export const UPDATE_DRINK_DATE = 'UPDATE_DRINK_DATE';

export const FETCH_DRINK_ENTRIES = 'FETCH_DRINK_ENTRIES';


// CALCULATOR PAGE ---------------------------------------------

export function fetchJuomat() {
    const juomatPromise = axios.get("http://localhost:8080/all_drinks");

    return {
        type: FETCH_JUOMAT,
        payload: juomatPromise
    }
}

export function postDrinkListOk() {
   return {
        type: POST_DRINK_LIST_OK
    }
}

export function postDrinkListFailure() {
    return {
         type: POST_DRINK_LIST_FAILURE
     }
 }
 
 export function postDrinkListClearStatus() {
    return {
        type: POST_DRINK_LIST_CLEAR_STATUS
    }
 }

export function updateJuomalistaState(juomaObj) {
    return {
        type: UPDATE_JUOMALISTA_STATE,
        payload: juomaObj
    }
}

export function decreaseQuantity(juomaObj) {
    return {
        type: DECREASE_QUANTITY,
        payload: juomaObj
    }
}

export function emptyDrinkList() {
    return {
        type: EMPTY_DRINK_LIST
    }
}

export function populateDrinkList(drinkList, callback) {
    return {
        type: POPULATE_DRINK_LIST,
        payload: drinkList
    }
}

export function populateDrinkListBu(drinkList, callback) {
    return {
        type: POPULATE_DRINK_LIST_BU,
        payload: drinkList
    }
}

export function emptyDrinkListBu() {
    return {
        type: EMPTY_DRINK_LIST_BU
    }
}

export function countUnitsInList(units) {
    return {
        type: COUNT_UNITS_IN_LIST,
        payload: units
    }
}

export function updateDrinkDate(date) {
    return {
        type: UPDATE_DRINK_DATE,
        payload: date
    }
}

// DIARY PAGE ----------------------------------------

export function fetchDrinkEntries() {
    const drinkEntriesPromise = axios.get("http://localhost:8080/all_entries")
    
    return {
        type: FETCH_DRINK_ENTRIES,
        payload: drinkEntriesPromise
    }
}
