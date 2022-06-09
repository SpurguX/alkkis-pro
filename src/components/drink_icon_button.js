// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDrinkList } from '../actions';
import DrinkIconButtonBase from './drink_icon_button_base'

class DrinkIconButton extends DrinkIconButtonBase { 
    handleClick() {
        this.props.updateDrinkList(this.props)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { updateDrinkList } , dispatch);

}

export default connect(null, mapDispatchToProps)(DrinkIconButton);