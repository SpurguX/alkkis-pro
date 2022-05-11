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
            <div id="main" className="container-fluid container-login">
                <div id="banner">
                    <h1>ALKKIS PRO</h1> 
                </div>
                <div className="container content">
                    <div id="kirjautuminen">
                        <form className="form-horizontal" action="/in">
                            <div className="form-group">
                                {/* <label className="control-label col-sm-2 col-sm-offset-2"><span className="glyphicon glyphicon-user login-icon"></span></label> */}
                                <div>
                                    <input type="text" className="form-control form-control-lg" placeholder="Käyttäjänimi" />
                                </div>
                            </div>
                            <div className="form-group">
                                {/* <label className="control-label col-sm-2 col-sm-offset-2" ><span className="glyphicon glyphicon-lock login-icon"></span></label> */}
                                <div>
                                    <input type="password" className="form-control form-control-lg" placeholder="Salasana" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                <input type="submit" className="btn btn-primary btn-block btn-lg" value="KIRJAUDU" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        {/* <div id="kirjautumissivu-kuva">
                            <img src={beer} alt="beer" style={{width: '100%'}}/>
                        </div> */}
                        <div id="kirjautumissivu-kuvaus" className="col-sm-6">
                            <p>Nyt vasta aletaan ryyppäämään!</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}