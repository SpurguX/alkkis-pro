import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showOthDrinkModal } from '../actions';

class OtherDrinkButton extends Component {

    render() {
        const icon = require('../images/tall-glass.svg').default

        return (
            <div className="drink-icon-button-container" onClick={this.props.showOthDrinkModal} >
                <div className="drink-icon-button">
                    <img src={icon} alt="img" className="drink-icon"/>
                    <p className="mb-0">Muu Juoma</p>
                    <p className="mt-0 mb-0">Syötä arvot</p>
                    {/* <div className="drink-icon-button-badge drink-icon-button-badge--alcohol">?&#8202;%</div> */}
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { showOthDrinkModal } , dispatch);

}

export default connect(null, mapDispatchToProps)(OtherDrinkButton);