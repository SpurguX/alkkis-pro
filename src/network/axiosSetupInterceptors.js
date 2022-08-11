"Use strict";

import api from "./axiosApi";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthToken } from "../actions"
import { ROUTE_LOGIN } from '../utils/paths';

/**
 * Interceptors are setup via a functional React component so that React/Redux hooks can be used in the interceptor functions.
 */
const SetupInterceptors = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    // Request
    api.interceptors.request.use(function (request) {
      // Get token from localStorage every time the callback is invoked as localStorage is not reactive.
      const token = localStorage.getItem('token');

      if (token) {
        request.headers.Authorization = `Bearer ${token}`
      }
      return request
    },
    function (error) {
      console.log('error :>> ', error);
      return Promise.reject(error)
    })

    // Response
    api.interceptors.response.use(function (response) {
      return response
    },
    function (error) {
      console.log('error :>> ', error);

      const statusCode = error?.response?.status
      console.log('statusCode :>> ', statusCode);

      // No token or expired token or no permission
      if (statusCode === 401 || statusCode === 403) {
        dispatch(clearAuthToken());

        if (location.pathname !== ROUTE_LOGIN) history.replace(ROUTE_LOGIN)
      }

      return Promise.reject(error)
    })

    return null
}

export default SetupInterceptors;
