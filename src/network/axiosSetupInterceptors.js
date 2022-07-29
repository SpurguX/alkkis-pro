"Use strict";

import api from "./axiosApi";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthToken } from "../actions"

/**
 * Interceptors are setup via a functional React component so that React/Redux hooks can be used in the interceptor functions.
 */
const SetupInterceptors = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const token = useSelector(state => {
      return state.authentication.token || localStorage.getItem('token')
    })

    // Request
    api.interceptors.request.use(function (request) {
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

      if (statusCode === 401 || statusCode === 403) {
        dispatch(clearAuthToken());

        if (location.pathname !== "/") history.replace("/")
      }

      return Promise.reject(error)
    })

    return null
}

export default SetupInterceptors;
