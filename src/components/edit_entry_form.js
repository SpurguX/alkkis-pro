import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  hideEditEntryModal,
  fetchDrinks,
  fetchSavedDrinks,
  fetchDrinkEntries,
  updateDrinkDate
} from "../actions";
import axios from "axios";
import moment from "moment";
import { renderDrinksAsOptions } from "../helpers/functions";
import DrinkDatePicker from "./drink_datepicker";

class EditEntryForm extends Component {
  constructor(props) {
    super(props);

    const {
      drink,
      drink_entry_id,
      drink_entry_units,
      drink_quantity
    } = this.props.entry;
    let drinkDate = new Date(Date.parse(this.props.entry.drink_date));
    let drinkDateMoment = moment(drinkDate);

    this.state = {
      drink: drink,
      drink_entry_id: drink_entry_id,
      drink_entry_units: drink_entry_units,
      drink_date: drinkDateMoment,
      drink_quantity: drink_quantity
    };
  }

  componentDidMount() {
    this.props.fetchDrinks();
    this.props.fetchSavedDrinks();
    this.props.updateDrinkDate(this.state.drink_date);
  }

  countUnitsInEntry = (units, quantity) => units * quantity;

  handleQuantityChange = event => {
    let quantityInt = parseInt(event.target.value, 10);
    if (quantityInt > 100) {
      quantityInt = 100;
    }
    this.setState(
      {
        drink_quantity: quantityInt
      },
      () => {
        this.setState({
          drink_entry_units: this.countUnitsInEntry(
            this.state.drink.units,
            quantityInt
          )
        });
      }
    );
  };

  handleSelection = () => {
    const { drinks, savedDrinks } = this.props;
    let drinkIdOfSelected = "";
    const options = document.getElementsByTagName("option");
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        drinkIdOfSelected = options[i].getAttribute("drink_id");
        break;
      }
    }
    this.updateDrinkToState(drinks, savedDrinks, drinkIdOfSelected);
  };

  updateDrinkToState(drinks, savedDrinks, drinkIdOfSelected) {
    if (Object.keys(drinks).includes(drinkIdOfSelected)) {
      this.setState({ drink: drinks[drinkIdOfSelected] }, () =>
        this.setState({
          drink_entry_units: this.countUnitsInEntry(
            this.state.drink.units,
            this.state.drink_quantity
          )
        })
      ); // rumaa toistoa, refaktoroi
    } else if (Object.keys(savedDrinks).includes(drinkIdOfSelected)) {
      this.setState({ drink: savedDrinks[drinkIdOfSelected] }, () =>
        this.setState({
          drink_entry_units: this.countUnitsInEntry(
            this.state.drink.units,
            this.state.drink_quantity
          )
        })
      );
    }
  }

  setInitialOption() {
    const options = document.getElementsByTagName("option");
    const { drinkId } = this.state.drink;
    for (var i = 0; i < options.length; i++) {
      if (options[i].getAttribute("drink_id") === drinkId.toString()) {
        let el = document.querySelector(`option[drink_id='${drinkId}']`)
        el.setAttribute("selected", true)
        break;
      }
    }
  }

  handleAdd = (event) => {
    event.preventDefault();
    this.editEntry();
  }

  editEntry = () => { 
    axios({
      method: "post",
      url: "http://jessetaina.info:8080/edit_entry",
      data: this.state
    }).then(response => {
      console.log(response);
      this.props.fetchDrinkEntries();
      this.props.hideEditEntryModal();
    });
  };

  render() {
    this.setInitialOption()

    return (
      <form className="form-horizontal">
        <div className="form-group edit-entry-form-group">
          <label className="control-label col-sm-3">Juontipäivä: </label>
          <div className="col-sm-8">
            <DrinkDatePicker />
          </div>
        </div>
        <div className="form-group edit-entry-form-group">
          <label className="control-label col-sm-3">Juoma: </label>
          <div className="col-sm-8">
            <select onChange={this.handleSelection} className="edit-entry-field" id="edit-entry-select">
              {renderDrinksAsOptions(this.props.drinks)}
              {renderDrinksAsOptions(this.props.savedDrinks)}
            </select>
          </div>
        </div>
        <div className="form-group edit-entry-form-group">
          <label className="control-label col-sm-3">Kappalemäärä:</label>
          <div className="col-sm-2">
            <input
              type="number"
              name="quantity"
              step={1}
              max={100}
              className="form-control input-lg edit-entry-field"
              value={this.state.drink_quantity}
              onChange={this.handleQuantityChange}
            />
          </div>
        </div>
        <div className="form-group edit-entry-form-group">
          <label className="control-label col-sm-3">Annokset:</label>
          <div className="col-sm-2">
            <div id="units-text">{this.state.drink_entry_units.toFixed(1)}</div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-6 col-sm-offset-3">
            <button className="btn btn-default" onClick={this.handleAdd}>
              Vahvista muokkaus
            </button>
          </div>
          <div  className="col-sm-2 close-btn-div">
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.hideEditEntryModal}
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
    entry: state.editEntryModal.entry,
    drinks: state.drinks,
    savedDrinks: state.savedDrinks,
    drinkDate: state.drinkDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { hideEditEntryModal, fetchDrinks, fetchSavedDrinks, updateDrinkDate, fetchDrinkEntries },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryForm);
