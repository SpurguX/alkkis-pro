import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateDrinkDate } from "../actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import "moment/locale/fi";

class DrinkDatePicker extends Component {
  handleChange(date) {
    this.props.updateDrinkDate(date);
  }

  render() {
    console.log(this.props.drinkDate);
    return (
      <div className="btn-group btn-group-lg ml-2 mr-2" role="group">
        <div class="input-group-prepend">
          <div class="input-group-text" id="btnGroupAddon">Juomispäivä</div>
        </div>
        <DatePicker
          selected={this.props.drinkDate}
          onChange={date => this.handleChange(date)}
          locale="fi"
        />
      </div>
    );
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
