import React, { Component } from 'react';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = { page: '' };
    }

    render() {
        return (
            <nav className="navbar navbar-inverse" id="nav-alkkis">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">Alkkis Pro</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><a href="/in">Annoslaskuri</a></li>
                            <li><a href="/diary">Päiväkirja</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/">Kirjaudu ulos  <span className="glyphicon glyphicon-log-out"></span> </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}