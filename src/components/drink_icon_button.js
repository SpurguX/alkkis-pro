import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateJuomalistaState } from '../actions';
import beerIcon from '../images/beer-drink-jar-outline.svg'

class DrinkIconButton extends Component {
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
                    <img src={beerIcon} alt="beer" style={{height: '3.4rem'}}/>
                    <p>{this.props.drink_name } {`${this.props.volume} l`}<br />{`${this.props.alc_content} %`}</p>              
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { updateJuomalistaState } , dispatch);

}

export default connect(null, mapDispatchToProps)(DrinkIconButton);