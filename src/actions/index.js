import axiosApi from '../network/axiosApi';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const CLEAR_AUTH_TOKEN = 'CLEAR_AUTH_TOKEN';

export const FETCH_DRINKS = 'FETCH_DRINKS';
export const UPDATE_DRINK_FILTER_CONDITIONS = 'UPDATE_DRINK_FILTER_CONDITIONS';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
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
export const SHOW_DELETE_ENTRY_MODAL = 'SHOW_DELETE_ENTRY_MODAL';
export const HIDE_DELETE_ENTRY_MODAL = 'HIDE_DELETE_ENTRY_MODAL';
export const SELECT_DIARY_TAB = 'SELECT_DIARY_TAB';

export const ADD_SNACKBAR = 'ADD_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const SAVE_CURRENT_SCREEN_SIZE = 'SAVE_CURRENT_SCREEN_SIZE';

export const SHOW_CHANGE_PASSWORD_MODAL = 'SHOW_CHANGE_PASSWORD_MODAL';
export const HIDE_CHANGE_PASSWORD_MODAL = 'HIDE_CHANGE_PASSWORD_MODAL';

// AUTH --------------------------------------------------------

export async function login(credentials) {
  const options = {
    method: 'POST',
    data: credentials,
    url: 'authenticate',
  };

  let authToken = '';

  let error;
  try {
    const response = await axiosApi.request(options);
    authToken = response.data.token;
  } catch (e) {
    error = e
  }

  return {
    type: SET_AUTH_TOKEN,
    payload: authToken,
    error,
  };
}

export async function clearAuthToken() {
    return {
        type: CLEAR_AUTH_TOKEN,
    }
}



// CALCULATOR PAGE ---------------------------------------------

export function fetchDrinks() {
    const drinksPromise = axiosApi.get("all_default_drinks");

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

export function increaseQuantity(DrinkObj) {
    return {
        type: INCREASE_QUANTITY,
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
    return {
        type: HIDE_OTH_DRINK_MODAL
    }
}

export function fetchSavedDrinks() {
    let savedDrinksPromise = axiosApi.get("all_saved_drinks")

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
    const drinkEntriesPromise = axiosApi.get("entry")
    
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

export function showDeleteEntryModal(deleteFunc) {
    return {
        type: SHOW_DELETE_ENTRY_MODAL,
        payload: deleteFunc
    }
}
export function hideDeleteEntryModal() {
    return {
        type: HIDE_DELETE_ENTRY_MODAL
    }
}

export function selectDiaryTab(selectedTab) {
    return {
        type: SELECT_DIARY_TAB,
        payload: selectedTab
    }
}

// GENERAL / MISC ----------------------------------

export function addSnackbar(snackbar) {
    return {
        type: ADD_SNACKBAR,
        payload: snackbar
    }
}

export function removeSnackbar(snackbar) {
    return {
        type: REMOVE_SNACKBAR,
        payload: snackbar
    }
}

export function saveCurrentScreenSize(screenSize) {
    return {
        type: SAVE_CURRENT_SCREEN_SIZE,
        payload: screenSize
    }
}

export function showChangePasswordModal() {
  return {
      type: SHOW_CHANGE_PASSWORD_MODAL
  }
}

export function hideChangePasswordModal() {
  return{
      type: HIDE_CHANGE_PASSWORD_MODAL
  }
}
