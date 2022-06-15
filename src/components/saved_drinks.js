import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideOthDrinkModal, updateDrinkList, fetchSavedDrinks } from "../actions";
import { renderDrinksAsOptions } from '../utils/functions';

class SavedDrinks extends Component {

  componentDidMount() {
    this.props.fetchSavedDrinks();
  }

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
          <div className="col-sm-6 col-sm-offset-3">
            <button className="btn btn-default" onClick={this.handleAdd}>
              Lisää valitut juomat listaan
            </button>
          </div>
          <div className="col-sm-2 close-btn-div">
            <button
              type="button"
              className="btn btn-default"
              onClick={this.props.hideOthDrinkModal}
            >
              Sulje
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
