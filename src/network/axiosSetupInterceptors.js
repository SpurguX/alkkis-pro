"Use strict";

import axiosApi from "./axiosApi";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthToken } from "../actions"
import { ROUTE_LOGIN } from '../utils/routes';

/**
 * Interceptors are setup via a functional React component so that React/Redux hooks can be used in the interceptor functions.
 */
const SetupInterceptors = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  function interceptRequest(request) {
    // Get token from localStorage every time the callback is invoked as localStorage is not reactive.
    const token = localStorage.getItem('token');

    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  }

  function interceptRequestError(error) {
    console.log('error :>> ', error);
    return Promise.reject(error)
  }

  function interceptResponse(response) {
    return response
  }

  function interceptResponseError(error) {
    console.log('error :>> ', error);

    const statusCode = error?.response?.status
    console.log('statusCode :>> ', statusCode);

    // No token or expired token or no permission
    if (statusCode === 401 || statusCode === 403) {
      dispatch(clearAuthToken());

      if (location.pathname !== ROUTE_LOGIN) history.replace(ROUTE_LOGIN)
    }

    return Promise.reject(error)
  }

  // Request
  axiosApi.interceptors.request.use(interceptRequest, interceptRequestError)

  // Response
  axiosApi.interceptors.response.use(interceptResponse, interceptResponseError)

  return null
}

export default SetupInterceptors;
