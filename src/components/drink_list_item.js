import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increaseQuantity, decreaseQuantity } from '../actions';

class DrinkListItem extends Component {
    constructor(props) {
        super(props);

        this.handlePlusClick = this.handlePlusClick.bind(this);
        this.handleMinusClick = this.handleMinusClick.bind(this);
    }
    
    handlePlusClick() {
        this.props.increaseQuantity(this.props);
    }

    handleMinusClick() {
        this.props.decreaseQuantity(this.props);
    }

    volumeDisplayValue() {
       return this.props.volume > 0.24 ? `${this.props.volume} l` : `${this.props.volume / 100} cl`
    }

    render() {
        return (
            <li className="list-group-item drink-list-item">
                <span className="glyphicon glyphicon-minus col-xs-1 list-item-minus" onClick={this.handleMinusClick}></span>
                <span className="col-xs-9 list-item-data">{this.props.drinkName} {volumeDisplayValue()}, {this.props.alcContent} %</span>
                <span className="col-xs-1 list-item-quantity">{this.props.quantity}</span>
                <span className="glyphicon glyphicon-plus list-item-plus col-xs-1" onClick={this.handlePlusClick}></span>
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { increaseQuantity, decreaseQuantity } , dispatch);

}

export default connect(null, mapDispatchToProps)(DrinkListItem);