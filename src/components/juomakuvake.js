import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateJuomalistaState } from '../actions';

class Juomakuvake extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.updateJuomalistaState(this.props)
    }

    render() {
        return (
            <div className="col-sm-3 col-xs-6 juomakuvake-container" onClick={this.handleClick} >
                <div className="juomakuvake">
                    <p>{this.props.juoma_nimi != null ? this.props.juoma_nimi : "Juomajuoma_nimi"}, {this.props.tilavuus != null ? `${this.props.tilavuus} l` : "? l"}</p>
                    <p><span className="juoma-icon glyphicon glyphicon-glass"></span></p>
                    <p>{this.props.vahvuus != null ? `${this.props.vahvuus} %` : "? %"}</p>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { updateJuomalistaState } , dispatch);

}

export default connect(null, mapDispatchToProps)(Juomakuvake);