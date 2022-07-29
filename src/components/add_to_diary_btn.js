import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  emptyDrinkList,
  addSnackbar,
} from "../actions";
import _ from "lodash";
import axiosApi from '../network/axiosApi';

class AddToDiaryBtn extends Component {
  async postDrinkList(drinkList, date) {
    const drinkListArray = _.map(drinkList, (drinkListItem) => {
      const entryUnits = drinkListItem.units * drinkListItem.quantity;
      return {
        drink_date: date.toISOString(),
        drink: { drinkId: drinkListItem.drinkId },
        drink_quantity: drinkListItem.quantity,
        drink_entry_units: entryUnits,
      };
    });

    let resultText = 'Juomat on lisätty päiväkirjaan';
    try {
      const response = await axiosApi.request({
        method: "post",
        url: "entry",
        data: drinkListArray,
      });
      if (response.status === 200) {
        this.props.emptyDrinkList();
      } else {
        resultText = 'Juomien lisääminen epäonnistui'
      }
    } catch (error) {
        resultText = 'Juomien lisääminen epäonnistui'
    } finally {
      this.props.addSnackbar({ text: resultText });
    }
  }

  handleClick() {
    this.postDrinkList(this.props.drinkList, this.props.drinkDate);
  }

  renderBtn() {
    if (_.isEmpty(this.props.drinkList)) {
      return (
        <button
          type="button"
          className="btn btn-lg btn-wood disabled ml-2 mr-2"
          tabIndex="-1"
        >
          Lisää juomat päiväkirjaan
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-lg btn-wood ml-2 mr-2"
          onClick={() => this.handleClick()}
        >
          Lisää juomat päiväkirjaan
        </button>
      );
    }
  }

  render() {
    return this.renderBtn();
  }
}

function mapStateToProps(state) {
  return {
    drinkList: state.drinkList,
    drinkDate: state.drinkDate,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      emptyDrinkList,
      addSnackbar,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToDiaryBtn);
