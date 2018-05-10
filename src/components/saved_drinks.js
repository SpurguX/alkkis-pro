import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateJuomalistaState } from "../actions";
import axios from "axios";
import _ from 'lodash';

class SavedDrinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedDrinks: [],
    };
  }

  componentDidMount() {
    this.fetchSavedDrinks();
  }

  fetchSavedDrinks() {
    axios
      .get("http://localhost:8080/all_saved_drinks")
      .then(response => {
        let savedDrinksIdsAsKeys = _.mapKeys(response.data, 'drinkId');   
        this.setState({ savedDrinks: savedDrinksIdsAsKeys });
      })
      .catch(response => {
        console.log("terrible error", response);
      });
  }

  renderSavedDrinks() {
    const options = _.map(this.state.savedDrinks, drink => {
      const { drinkId, drinkName, volume, alcContent } = drink;
      return (
        <option key={drinkId} drink_id={drinkId} onClick={this.click}>
          {drinkName} {volume} l, {alcContent} %
        </option>
      );
    });
    return options;
  }

  handleAdd = (event) => {
    event.preventDefault();
    const options = document.getElementsByTagName("option");
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        let drinkId = options[i].getAttribute("drink_id");
        this.props.updateJuomalistaState(this.state.savedDrinks[drinkId]);
      }
    }
  };

  render() {
    console.log(this.state.savedDrinks);

    return (
      <form className="form-horizontal">
        <div className="col-sm-offset-1 col-sm-10">
          <select multiple className="form-control" id="other-drink-select">
            {this.renderSavedDrinks()}
          </select>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateJuomalistaState }, dispatch);
}

export default connect(null, mapDispatchToProps)(SavedDrinks);
