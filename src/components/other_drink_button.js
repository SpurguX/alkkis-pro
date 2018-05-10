import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showOthDrinkModal } from '../actions';

class OtherDrinkButton extends Component {

    render() {
        return (
            <div className="col-sm-3 col-xs-6 juomakuvake-container" onClick={this.props.showOthDrinkModal} >
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
    return bindActionCreators( { showOthDrinkModal } , dispatch);

}

export default connect(null, mapDispatchToProps)(OtherDrinkButton);