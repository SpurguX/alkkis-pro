"Use strict";

import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8080'
  // TODO get url from env config
  // TODO update digitalocean droplet to a newer Ubuntu version in order to use https
  baseURL: 'http://jessetaina.info:8080'
});

export default api;
