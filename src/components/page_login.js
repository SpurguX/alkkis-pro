import React, { Component } from 'react';
import LoginForm from './login_form';

const v = require('../../package.json')?.version;

export default class LoginPage extends Component {

    render() {
        return (
            <div id="main" className="container-fluid container-bg-img px-0">
                <div className="container login-wrapper d-flex flex-column justify-content-center">
                    <div className="mt-5 mb-4 logo--login--wrapper rounded px-1">
                        <div className="logo--login">ALKKIS PRO</div>
                    </div>
                    <div className="login-content">
                        <LoginForm />
                        <div className="login-description text-center font-christmas mt-5">
                            Nyt vasta <span className="text-underline">aletaan</span> ryyppäämään!
                        </div>
                    </div>
                    <div data-v={v}></div>
                </div>
            </div>
        )
    }
}
