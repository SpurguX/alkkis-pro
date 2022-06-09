import axios from 'axios';

export const FETCH_DRINKS = 'FETCH_DRINKS';
export const UPDATE_DRINK_FILTER_CONDITIONS = 'UPDATE_DRINK_FILTER_CONDITIONS';
export const UPDATE_DRINK_LIST = 'UPDATE_DRINK_LIST';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const EMPTY_DRINK_LIST = 'EMPTY_DRINK_LIST';
export const POPULATE_DRINK_LIST_BU = 'POPULATE_DRINK_LIST_BU';
export const POPULATE_DRINK_LIST = 'POPULATE_DRINK_LIST';
export const EMPTY_DRINK_LIST_BU = 'EMPTY_DRINK_LIST_BU';
export const COUNT_UNITS_IN_LIST = 'COUNT_UNITS_IN_LIST';
export const POST_DRINK_LIST_OK = 'POST_DRINK_LIST_OK';
export const POST_DRINK_LIST_FAILURE = 'POST_DRINK_LIST_FAILURE';
export const POST_DRINK_LIST_CLEAR_STATUS = 'POST_DRINK_LIST_CLEAR_STATUS';
export const UPDATE_DRINK_DATE = 'UPDATE_DRINK_DATE';
export const SHOW_OTH_DRINK_MODAL = 'SHOW_OTH_DRINK_MODAL';
export const HIDE_OTH_DRINK_MODAL = 'HIDE_OTH_DRINK_MODAL';
export const SHOW_ADD_RESULT_MODAL = 'SHOW_ADD_DRINK_MODAL';
export const HIDE_ADD_RESULT_MODAL = 'HIDE_ADD_DRINK_MODAL';
export const FETCH_SAVED_DRINKS = 'FETCH_SAVED_DRINKS';

export const FETCH_DRINK_ENTRIES = 'FETCH_DRINK_ENTRIES';
export const SHOW_EDIT_ENTRY_MODAL = 'SHOW_EDIT_ENTRY_MODAL';
export const HIDE_EDIT_ENTRY_MODAL = 'HIDE_EDIT_ENTRY_MODAL';
export const SELECT_DIARY_TAB = 'SELECT_DIARY_TAB';

// CALCULATOR PAGE ---------------------------------------------

export function fetchDrinks() {
    // const drinksPromise = axios.get("http://jessetaina.info:8080/all_default_drinks");
    const drinksPromise = axios.get("http://localhost:8080/all_default_drinks");

    return {
        type: FETCH_DRINKS,
        payload: drinksPromise
    }
}

export function updateDrinkFilterConditions(conditions) {
    return {
        type: UPDATE_DRINK_FILTER_CONDITIONS,
        payload: conditions
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

export function updateDrinkList(DrinkObj) {
    return {
        type: UPDATE_DRINK_LIST,
        payload: DrinkObj
    }
}

export function decreaseQuantity(DrinkObj) {
    return {
        type: DECREASE_QUANTITY,
        payload: DrinkObj
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

export function showOthDrinkModal() {
    return {
        type: SHOW_OTH_DRINK_MODAL
    }
}

export function hideOthDrinkModal() {
    return{
        type: HIDE_OTH_DRINK_MODAL
    }
}

export function fetchSavedDrinks() {
    // let savedDrinksPromise = axios.get("http://jessetaina.info:8080/all_saved_drinks")
    let savedDrinksPromise = axios.get("http://localhost:8080/all_saved_drinks")

    return {
        type: FETCH_SAVED_DRINKS,
        payload: savedDrinksPromise
    }
}

export function showAddResultModal() {
    return {
        type: SHOW_ADD_RESULT_MODAL
    }
}

export function hideAddResultModal() {
    return{
        type: HIDE_ADD_RESULT_MODAL
    }
}

// DIARY PAGE ----------------------------------------

export function fetchDrinkEntries() {
    // const drinkEntriesPromise = axios.get("http://jessetaina.info:8080/all_entries")
    const drinkEntriesPromise = axios.get("http://localhost:8080/all_entries")
    
    return {
        type: FETCH_DRINK_ENTRIES,
        payload: drinkEntriesPromise
    }
}

export function showEditEntryModal(entry) {
    return {
        type: SHOW_EDIT_ENTRY_MODAL,
        payload: entry
    }
}

export function hideEditEntryModal() {
    return {
        type: HIDE_EDIT_ENTRY_MODAL
    }
}

export function selectDiaryTab(selectedTab) {
    return {
        type: SELECT_DIARY_TAB,
        payload: selectedTab
    }
}