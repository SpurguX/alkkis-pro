import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateJuomalistaState } from '../actions';

class OtherDrinkButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        console.log("muu juoma klickt")
    }



    render() {
        return (
            <div className="col-sm-3 col-xs-6 juomakuvake-container" onClick={this.props.onClick} >
                <div className="juomakuvake">
                    <p>Muu Juoma</p>
                    <p><span className="juoma-icon glyphicon glyphicon-glass"></span></p>
                    <p>? %</p>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { updateJuomalistaState } , dispatch);

}

export default connect(null, mapDispatchToProps)(OtherDrinkButton);