import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideOthDrinkModal, updateDrinkList, fetchSavedDrinks } from "../actions";
import axios from "axios";
import _ from 'lodash';
import { renderDrinksAsOptions } from '../helpers/functions';

class SavedDrinks extends Component {

  componentDidMount() {
    this.props.fetchSavedDrinks();
  }

  // renderSavedDrinks() {
  //   const options = _.map(this.props.savedDrinks, drink => {
  //     const { drinkId, drinkName, volume, alcContent } = drink;
  //     return (
  //       <option key={drinkId} drink_id={drinkId} onClick={this.click}>
  //         {drinkName} {volume} l, {alcContent} %
  //       </option>
  //     );
  //   });
  //   return options;
  // }

  handleAdd = (event) => {
    event.preventDefault();
    const options = document.getElementsByTagName("option");
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        let drinkId = options[i].getAttribute("drink_id");
        this.props.updateDrinkList(this.props.savedDrinks[drinkId]);
      }
    }
    this.props.hideOthDrinkModal();
  };

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-offset-1 col-sm-10">
            <div className="col-sm-1"><span className="glyphicon glyphicon-info-sign" id="saved-drink-info"></span></div>
            Valitse useampi juoma pitämällä control-näppäintä painettuna
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-1 col-sm-10">
            <select multiple className="form-control" id="saved-drink-select">
              {renderDrinksAsOptions(this.props.savedDrinks)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-4 col-sm-offset-4">
            <button className="btn btn-primary" onClick={this.handleAdd}>
              Lisää valitut juomat listaan
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedDrinks: state.savedDrinks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideOthDrinkModal, updateDrinkList, fetchSavedDrinks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedDrinks);
