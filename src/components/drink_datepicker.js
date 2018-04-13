import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {  } from '../actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
import moment from 'moment';
import 'moment/locale/fi';

class DrinkDatepicker extends Component {
    constructor (props) {
        super(props)
        this.state = {
          startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
      }
    
    handleChange(date) {
    this.setState({
        startDate: date
    });
    }

    render() {
    return( 
        <div className="datepicker-container">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            locale="fi"
        />
        </div>
    );
    }
    
}

function mapStateToProps(state) {
    return {
        date: 0
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { } , dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDatepicker);