import React, { Component } from 'react';
import beer from '../images/craft-beer.jpg';

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            unameInput: '',
            pwdInput: ''
        }
    }

    render() {
        return (
            <div id="main" className="container">
                <div id="banner">
                    <h1>ALKKIS PRO</h1>
                </div>
                <div className="content">
                    <div id="kirjautuminen">
                        <form className="form-horizontal" action="/in">
                            <div className="form-group">
                                <label className="control-label col-sm-2 col-sm-offset-2"><span className="glyphicon glyphicon-user login-icon"></span></label>
                                <div className="col-sm-4" >
                                    <input type="text" className="form-control input-lg" placeholder="Käyttäjänimi" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2 col-sm-offset-2" ><span className="glyphicon glyphicon-lock login-icon"></span></label>
                                <div className="col-sm-4" >
                                    <input type="password" className="form-control input-lg" placeholder="Salasana" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-4 col-sm-offset-4">
                                <input type="submit" className="btn btn-primary btn-block btn-lg" value="KIRJAUDU" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div id="kirjautumissivu-kuva" className="col-sm-6">
                            <img src={beer} alt="beer" style={{height: '30rem'}}/>
                        </div>
                        <div id="kirjautumissivu-kuvaus" className="col-sm-6">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}