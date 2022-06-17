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
    console.log(this.props.drinkDate);
    return (
      <div className="btn-group ml-2 mr-2 container-wooden-borders" role="group">
        {/* <div class="input-group-prepend"> */}
        <div className="pt-2 px-2 btn-wood">Juomispäivä</div>
        {/* </div> */}
        <DatePicker
          selected={this.props.drinkDate}
          onChange={date => this.handleChange(date)}
          dateFormat="d.M.yyyy"
          locale={fi}
          renderCustomHeader={({
            monthDate,
            decreaseMonth,
            increaseMonth,
          }) => (
            <div>
              <button
                aria-label="Previous Month"
                className={
                  "react-datepicker__navigation react-datepicker__navigation--previous"
                }
                onClick={decreaseMonth}
              >
                <span
                  className={
                    "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                  }
                >
                  {"<"}
                </span>
              </button>
              <span className="react-datepicker__current-month">
                {monthDate.toLocaleString("fi-FI", {
                  month: "long",
                  // year: "numeric",
                })}
                <span className="font-segoe font-weight-light"> {monthDate.toLocaleString("fi-FI", { year: "numeric"})}</span>
              </span>
              <button
                aria-label="Next Month"
                className={
                  "react-datepicker__navigation react-datepicker__navigation--next"
                }
                onClick={increaseMonth}
              >
                <span
                  className={
                    "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                  }
                >
                  {">"}
                </span>
              </button>
            </div>
          )}
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
