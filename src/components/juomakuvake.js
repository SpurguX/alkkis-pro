import React, { Component } from 'react';

export default class Juomakuvake extends Component {

    render() {
        return (
            <div className="col-sm-2 juomakuvake-container">
                <div className="juomakuvake">
                    <h5>{this.props.nimi != null ? this.props.nimi : "Juomanimi"}</h5>
                    <p>{this.props.tilavuus != null ? `${this.props.tilavuus} l` : "0,5 l"}</p>
                    <p>{this.props.vahvuus != null ? `${this.props.vahvuus} %` : "4,7 %"}</p>
                </div>
            </div>
        )
    }
}