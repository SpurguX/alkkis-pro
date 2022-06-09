import React, { Component } from 'react';
import logo from '../images/logo.png';
import LoginForm from './login_form'

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
            <div id="main" className="container-fluid container-bg-img px-0">
                <div className="container login-wrapper d-flex flex-column justify-content-center">
                    <div className="mb-4 logo--login--wrapper rounded px-1">
                        <img src={logo} className="logo--login" />
                    </div>
                    <div className="content">
                        <LoginForm />
                        <div id="kirjautumissivu-kuvaus" className="text-center">
                            Nyt vasta aletaan ryyppäämään!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}