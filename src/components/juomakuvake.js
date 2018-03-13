import React, { Component } from 'react';

export default class Juomakuvake extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.returnObj(this.props);
    }

    render() {
        return (
            <div className="col-sm-2 col-xs-4 juomakuvake-container" onClick={this.handleClick}>
                <div className="juomakuvake">
                    <h5>{this.props.nimi != null ? this.props.nimi : "Juomanimi"}</h5>
                    <p>{this.props.tilavuus != null ? `${this.props.tilavuus} l` : "0,5 l"}</p>
                    <p>{this.props.vahvuus != null ? `${this.props.vahvuus} %` : "4,7 %"}</p>
                </div>
            </div>
        )
    }
}