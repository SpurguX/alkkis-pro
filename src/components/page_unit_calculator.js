import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from "redux";
import DrinkIconButton from "./drink_icon_button";
import OtherDrinkButton from "./other_drink_button";
import OtherDrinkModal from "./other_drink_modal";
import DrinkList from "./drink_list";
import UnitCountDisplayer from "./unit_count_displayer";
import DrinkDatePicker from "./drink_datepicker";
import DrinkListButtons from "./drink_list_buttons";
import AddResultModal from "./drink_list_add_result_modal";
import { fetchDrinks } from "../actions";

class UnitCalculator extends Component {

  componentDidMount() {
    this.props.fetchDrinks();
  }

  renderKuvakkeet() {
    return _.map(this.props.drinks, drink => {
      return (
        <DrinkIconButton
          key={drink.drink_id}
          drink_id={drink.drink_id}
          drink_name={drink.drink_name}
          volume={drink.volume}
          alc_content={drink.alc_content}
          units={drink.units}
        />
      );
    });
  }

  renderJuomalistaItem(drink) {
    return (
      <li className="list-group-item">
        {drink.drink_name} <span className="badge">1</span>
      </li>
    );
  }

  render() {
    const otherDrinkModal = ( 
      this.props.othDrinkModal.show ?
      <OtherDrinkModal />
      : null
    );

    const addResultModal = (
      this.props.addResultModal.show ?
      <AddResultModal />
      : null
    );

    return (
      <div id="unit-calculator-container" className="alkkis-container">
        <div className="placeh col-sm-2 hidden-xs" />
        <div className="col-sm-8 col-xs-12 unit-calculator-wrapper">
          {/* <h2 className="otsikko">Annoslaskuri</h2> */}
          <div id="juomakuvakegrid-container" className="row">
            {this.props.drinks != null
              ? this.renderKuvakkeet(this.props.drinks)
              : "Loading..."}
            <OtherDrinkButton />
          </div>
          {otherDrinkModal}
          {addResultModal}
          <div id="unit-calculator-controls">
            <UnitCountDisplayer />
            <DrinkList />
            <DrinkDatePicker />
            <DrinkListButtons />
          </div>
        </div>
        <div className="placeh col-sm-2 hidden-xs" />
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    drinks: state.drinks,
    drinkList: state.drinkList,
    othDrinkModal: state.othDrinkModal,
    addResultModal: state.addResultModal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDrinks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitCalculator);
