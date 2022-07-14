import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addSnackbar,
  hideEditEntryModal,
  fetchDrinks,
  fetchSavedDrinks,
  fetchDrinkEntries,
  updateDrinkDate
} from "../actions";
import axios from "axios";
import { transformDrinksIntoOptions } from "../utils/functions";
import DrinkDatePicker from "./drink_datepicker";
import ReactSelect from 'react-select';


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
    // let drinkDateMoment = moment(drinkDate);

    this.state = {
      drink: drink,
      drink_entry_id: drink_entry_id,
      drink_entry_units: drink_entry_units,
      drink_date: drinkDate,
      drink_quantity: drink_quantity,
      drinkOptions: [],
      selectedDrink: null
    };
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchDrinks(),
      this.props.fetchSavedDrinks()
    ]).then(async () => {
      try {
        const drinkOptions = transformDrinksIntoOptions({...this.props.drinks, ...this.props.savedDrinks})
        this.setState({...this.state, drinkOptions })
        await this.props.updateDrinkDate(this.state.drink_date);
        this.setInitialOption()
      } catch (error) {
        console.log(error);
      }
    });
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

  handleDrinkSelection = (option) => {
    this.updateDrinkToState(option.value);
    this.styleSingleValuePercentages()
  };

  updateDrinkToState(drinkIdOfSelected) {
    const allDrinks = {...this.props.drinks, ...this.props.savedDrinks};
    const drink = allDrinks[drinkIdOfSelected] 

    this.setState({ drink }, () => {
      const drinkOption = this.state.drinkOptions.find(drinkOption => drinkOption.value === drinkIdOfSelected)
      this.setState({
        drink_entry_units: this.countUnitsInEntry(
          this.state.drink.units,
          this.state.drink_quantity
        ),
        selectedDrink: drinkOption,
      })
    });
  }

  setInitialOption() {
    const { drinkId } = this.state.drink;
    this.updateDrinkToState(drinkId)
    this.styleSingleValuePercentages()
  }

  handleAdd = (event) => {
    event.preventDefault();
    this.editEntry();
  }

  editEntry = async () => {
    const data = {
      ...this.state,
      drink_date: this.props.drinkDate
    }

    let resultText = 'Merkintä on päivitetty'
    try {
      const response = await axios({
        method: "post",
        // url: "http://jessetaina.info:8080/edit_entry",
        url: "http://localhost:8080/edit_entry",
        data: data,
      })
  
      this.props.fetchDrinkEntries();
      this.props.hideEditEntryModal();
      
      if (!(response.status === 200)) {
        resultText = 'Merkinnän päivitys epäonnistui'
      }
    } catch (error) {
      console.log('error :>> ', error);
      resultText = 'Merkinnän päivitys epäonnistui'
    } finally {
      this.props.addSnackbar({ text: resultText });
    }
  };

  // TODO Purkkaa - keksi parempi ratkaisu?
  styleSingleValuePercentages = () => {
    this.stylePercentages('react-select__single-value');
  }

  styleOptionPercentages = () => {
    this.stylePercentages('react-select__option');
  }

  stylePercentages (className) {
    const elements = document.getElementsByClassName(className);

    setTimeout(() => {
      for (const el of elements) {
        if (!el.innerHTML.includes('span')) {
          el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1) + '<span class="font-christmas">%</span>'
        }
      }
    }, 0)
  }

  unitsFormatted = () => this.state.drink_entry_units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  render() {
    return (
      <form className="form-horizontal px-3 py-3">
        <div className="form-group">
          <label className="control-label font-large chalk-underline">
            Juontipäivä:{" "}
          </label>
          <div className="row">
            <div className="col-lg-6 col-sm-8">
              <DrinkDatePicker minimalist />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label font-large chalk-underline">
            Juoma
          </label>
          <div className="row">
            <div className="col-lg-6 col-sm-8">
              <ReactSelect
                value={this.state.selectedDrink}
                onChange={this.handleDrinkSelection}
                onMenuOpen={this.styleOptionPercentages}
                className="react-select font-large"
                classNamePrefix="react-select"
                options={this.state.drinkOptions}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label font-large chalk-underline">
            Kappalemäärä
          </label>
          <div className="row">
            <div className="col-lg-2 col-sm-4">
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
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col font-xlarge">
              <label className="units-text chalk-underline">
                Annokset: {this.unitsFormatted()}
              </label>
            </div>
          </div>
        </div>
        <div className="form-group mt-4 mb-0">
          <div className="row no-gutters justify-content-between">
            <button
              type="button"
              className="btn btn-lg btn-wood"
              onClick={this.props.hideEditEntryModal}
            >
              Sulje
            </button>
            <button
              type="button"
              className="btn btn-lg btn-wood"
              onClick={this.handleAdd}
            >
              Vahvista muokkaus
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
    { addSnackbar, hideEditEntryModal, fetchDrinks, fetchSavedDrinks, updateDrinkDate, fetchDrinkEntries },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryForm);
