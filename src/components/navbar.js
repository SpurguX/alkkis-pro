import React, { Component } from 'react';
import { ROUTE_CALCULATOR, ROUTE_DIARY } from '../utils/paths';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    isCurrent(path) {
        return window.location?.pathname === path
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md" id="nav-alkkis">
                {/* <div className="container-fluid"> */}
                    <a className="navbar-brand font-xlarge font-christmas" href="/">Alkkis Pro</a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
                        <a href="#"><i className="bi bi-list"></i></a>
                    </button>
                            
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav ml-auto mr-auto font-christmas">
                            <li className="nav-item">
                                <a className={`nav-link ${this.isCurrent(ROUTE_CALCULATOR) && "nav-link-current"}`} href={ROUTE_CALCULATOR}>Annoslaskuri</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={ROUTE_DIARY}>Päiväkirja</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right font-christmas">
                            <li><a className="nav-link" href="/">Kirjaudu ulos <i className="bi bi-arrow-bar-right"></i></a></li>
                        </ul>
                    </div>
            </nav>
        )
    }
}