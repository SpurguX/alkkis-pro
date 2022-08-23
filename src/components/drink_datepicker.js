import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateDrinkDate } from "../actions";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import fi from "date-fns/locale/fi";

registerLocale(fi)

class DrinkDatePicker extends Component {
  handleChange(date) {
    this.props.updateDrinkDate(date);
  }

  render() {
    const { minimalist} = this.props
    if (minimalist) {
      return (
        <DatePicker
          className='react-datepicker--minimalist'
          selected={this.props.drinkDate}
          onChange={date => this.handleChange(date)}
          dateFormat="d.M.yyyy"
          locale={fi}
        />
      )
    } else {
      return (
        <div className="btn-group ml-2 mr-2 container-wooden-borders" role="group">
          <div className="pt-2 px-2 btn-wood btn-wood--no-shadow">Juomispäivä</div>
          <DatePicker
            selected={this.props.drinkDate}
            onChange={date => this.handleChange(date)}
            dateFormat="d.M.yyyy"
            locale={fi}
            popperPlacement="top"
          />
       </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    drinkDate: state.drinkDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDrinkDate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDatePicker);
