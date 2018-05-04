import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateJuomalistaState } from "../actions";
import axios from "axios";

class SavedDrinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedDrinks: [],
      selectedDrinks: []
    };
  }

  componentDidMount() {
    this.fetchSavedDrinks();
  }

  fetchSavedDrinks() {
    axios
      .get("http://localhost:8080/all_saved_drinks")
      .then(response => {
        this.setState({ savedDrinks: response.data });
      })
      .catch(response => {
        console.log("terrible error", response);
      });
  }

  renderSavedDrinks() {
    const options = this.state.savedDrinks.map(drink => {
      const { drink_id, drink_name, volume, alc_content } = drink;
      return (
        <option key={drink_id} drink_id={drink_id} onClick={this.click}>
          {drink_name} {volume} l, {alc_content} %
        </option>
      );
    });
    return options;
  }

  handleAdd = (event) => {
    event.preventDefault();
    const options = document.getElementsByTagName("option");
    let selectedDrinks = [];
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedDrinks.push(options[i].getAttribute("drink_id"));
      }
    }
    this.getDrinksObjsById(selectedDrinks)
  };

  getDrinksObjsById(selectedDrinks) {
    selectedDrinks.forEach((drink) => {
        console.log(drink)
        if (this.state.savedDrinks.includes(drink)) {
            console.log(drink)
        }
    })
    
  }

  render() {
    console.log(this.state.savedDrinks);
    this.renderSavedDrinks();

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
