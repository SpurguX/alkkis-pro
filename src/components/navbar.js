import React, { Component } from 'react';
import {
  ROUTE_DRUNK_TODAY,
  ROUTE_CALCULATOR,
  ROUTE_DIARY,
  ROUTE_LOGIN,
} from '../utils/routes';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearAuthToken, showChangePasswordModal } from '../actions';

const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isCurrent = (route) => {
    return window.location?.pathname === route;
  };

  const navigate = (route) => {
    history.replace(route);
  };

  const logout = () => {
    dispatch(clearAuthToken());
    history.replace(ROUTE_LOGIN);
  };

  return (
    <nav className="navbar navbar-expand-md" id="nav-alkkis">
      <a className="navbar-brand font-xlarge font-christmas" href="#">
        Alkkis Pro
      </a>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#myNavbar"
      >
        <a href="#">
          <i className="bi bi-list"></i>
        </a>
      </button>

      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav ml-auto mr-auto font-christmas">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => navigate(ROUTE_DRUNK_TODAY)}
            >
              Tänään juotu
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                isCurrent(ROUTE_CALCULATOR) && 'nav-link-current'
              }`}
              href="#"
              onClick={() => navigate(ROUTE_CALCULATOR)}
            >
              Annoslaskuri
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => navigate(ROUTE_DIARY)}
            >
              Päiväkirja
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(showChangePasswordModal())}
            >
              Tunnussana
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right font-christmas">
          <li>
            <a className="nav-link" href="#" onClick={logout}>
              Kirjaudu ulos <i className="bi bi-arrow-bar-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
