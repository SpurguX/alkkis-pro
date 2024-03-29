import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDrinkList } from '../actions';

class DrinkIconButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.updateDrinkList(this.props)
    }

    render() {
        const volume = this.props.volume.toLocaleString('fi');
        const alcContent = this.props.alcContent.toLocaleString('fi');

        let iconName;
        this.props.icon !== null ? iconName = this.props.icon : iconName = 'tall-glass.svg';
        const icon = require(`../images/${iconName}`);

        return (
            <div className="col-sm-3 col-xs-6 juomakuvake-container" onClick={this.handleClick} >
                <div className="juomakuvake">
                    <img src={icon} alt="img" className="drink-icon"/>
                    <p>{this.props.drinkName } {`${volume} l`}<br />{`${alcContent} %`}</p>              
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { updateDrinkList } , dispatch);

}

export default connect(null, mapDispatchToProps)(DrinkIconButton);