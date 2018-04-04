import axios from 'axios';

export const FETCH_JUOMAT = 'FETCH_JUOMAT';
export const GET_JUOMALISTA_STATE = 'GET_JUOMALISTA_STATE';
export const UPDATE_JUOMALISTA_STATE = 'UPDATE_JUOMALISTA_STATE';

export function fetchJuomat() {
    const juomatPromise = axios.get("http://localhost:8080/kaikki_juomat");

    return {
        type: FETCH_JUOMAT,
        payload: juomatPromise
    }
}

export function getJuomalistaState() {
    return {
        type: GET_JUOMALISTA_STATE,
        payload: 'nothing'
    }
}

export function updateJuomalistaState(juomaObj) {
    return {
        type: UPDATE_JUOMALISTA_STATE,
        payload: juomaObj
    }
}