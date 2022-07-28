"Use strict";

import api from "./axiosApi";
import React from "react";
import { useHistory } from "react-router-dom";

const SetupInterceptors = () => {
    var history = useHistory();
    console.log('history :>> ', history);
    // this is undefined.......

    api.interceptors.response.use(function (response) {
      return response
    },
    function (error) {
      console.log('error :>> ', error);

      const statusCode = error?.response?.status
      console.log('statusCode :>> ', statusCode);

      if (statusCode === 401 || statusCode === 403) {

        localStorage.removeItem("token");
        console.log('insideIf')
        // TODO replace doesn't work
        try {
          history.replace("/")
        } catch (err) {
          console.log('err :>> ', err);
        }
      }

      return Promise.reject(error)
    })

    return null
}

export default SetupInterceptors;
