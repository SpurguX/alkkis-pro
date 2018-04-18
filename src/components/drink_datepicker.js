import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {  } from '../actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
import 'moment/locale/fi';
import { updateDrinkDate } from '../actions';

class DrinkDatepicker extends Component {
    
    handleChange(date) {
        this.props.updateDrinkDate(date);
    }

    render() {
    return( 
        <div className="datepicker-container">
        <DatePicker
            selected={this.props.drinkDate}
            onChange={(date) => this.handleChange(date)}
            locale="fi"
        />
        </div>
    );
    }
    
}

function mapStateToProps(state) {
    return {
        drinkDate: state.drinkDate
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { updateDrinkDate } , dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDatepicker);