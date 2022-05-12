import React, { Component } from 'react';
import beer from '../images/craft-beer.jpg';
import logo from '../images/logo.png';

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
            <div id="main" className="container-fluid container-login px-0">
                <div className="container login-wrapper d-flex flex-column justify-content-center">
                    <div className="mb-4 logo--login--wrapper rounded">
                        <img src={logo} className="logo--login" />
                    </div>
                    <div className="content">
                        <div id="kirjautuminen">
                            <form className="form-horizontal" action="/in">
                                <div className="form-group">
                                    <div>
                                        <input type="text" className="form-control form-control-lg" placeholder="Käyttäjänimi" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div>
                                        <input type="password" className="form-control form-control-lg" placeholder="Salasana" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div>
                                    <input type="submit" className="btn btn-info btn-block btn-lg" value="KIRJAUDU" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div id="kirjautumissivu-kuvaus" className="text-center">
                            Nyt vasta aletaan ryyppäämään!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}