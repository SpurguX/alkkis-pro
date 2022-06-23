import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from "redux";
import DrinkIconButton from "./drink_icon_button";
import DrinkIconChosenButton from "./drink_icon_chosen_button";
import DrinkFilterBtnGroup from "./drink_filter_btn_group";
import OtherDrinkButton from "./other_drink_button";
import OtherDrinkModal from "./other_drink_modal";
import DrinkList from "./drink_list";
import UnitCountDisplayer from "./unit_count_displayer";
import DrinkDatePicker from "./drink_datepicker";
import DrinkListButtons from "./drink_list_buttons";
import AddResultModal from "./drink_list_add_result_modal";
import { fetchDrinks } from "../actions";
import LoggedInContainer from "./logged_in_container";
import { Snackbar } from "./snackbar";

class UnitCalculator extends Component {

  componentDidMount() {
    this.props.fetchDrinks();
  }

  renderDrinkIconButtons() {
    return _.map(this.props.drinks, drink => {
      const drinkIncludedInFilter = this.props.drinkFilterConditions.includes(drink.type)
      return (
        drinkIncludedInFilter ? <DrinkIconButton
          key={drink.drinkId}
          drinkId={drink.drinkId}
          drinkName={drink.drinkName}
          volume={drink.volume}
          alcContent={drink.alcContent}
          units={drink.units}
          icon={drink.icon}
        />
        : null) ;
    });
  }


  renderDrinkIconChosenButtons() {
    return _.map(this.props.drinkList, drink => {
      return (
        <DrinkIconChosenButton
          key={drink.drinkId}
          drinkId={drink.drinkId}
          drinkName={drink.drinkName}
          volume={drink.volume}
          alcContent={drink.alcContent}
          units={drink.units}
          icon={drink.icon}
          quantity={drink.quantity}
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

    // const addResultSnackbar = (
    //   <Snackbar
    //     text="Juomat on lisätty päiväkirjaan"
    //   />
    // )

    return (
      <LoggedInContainer>
      <div className="container-unit-calculator">
        {/* <div className="col-sm-2 hidden-xs" /> */}
        <div className="row pt-4 justify-content-center">
          <UnitCountDisplayer />
        </div>
        <div className="row pt-2">
          <div className="col-xl-6 col-lg-6 col-md-12 text-white">
            <div className="d-flex justify-content-center">
              <div className="container-wooden-borders">
                <div className="header-wrapper">
                  <h4 className="text-center">Valitse juomia</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 text-center text-white">
            <div className="d-flex justify-content-center">
              <div className="container-wooden-borders">
                <div className="header-wrapper">
                  <h4>Juodut juomat</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-xl-6 col-lg-6 col-md-12 drink-icon-button-col--drinks">
            <div className="drink-icon-button-grid-wrapper">
              {/* <h2 className="otsikko">Annoslaskuri</h2> */}
              <div className="row justify-content-center drink-icon-button-grid-container">
                {this.props.drinks != null
                  ? this.renderDrinkIconButtons(this.props.drinks)
                  : "Loading..."}
                <OtherDrinkButton />
              </div>
              {otherDrinkModal}
              {/* {addResultModal} */}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 drink-icon-button-col--chosen-drinks">
            <div className="drink-icon-button-grid-wrapper">
              <div className="row justify-content-center drink-icon-button-grid-container">
                  {this.props.drinkList != null
                    && this.renderDrinkIconChosenButtons(this.props.drinkList)
                  }
                </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="row justify-content-center">
              <div className="container-wooden-borders">
                <DrinkFilterBtnGroup />
              </div>
            </div> 
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="row justify-content-center mb-2">
              <DrinkDatePicker />
            </div>
            <div className="row justify-content-center">
              {/* <div className="col"> */}
              
              {/* </div> */}
              {/* <div className="col flex-grow-1"> */}
              <DrinkListButtons />
              {/* </div> */}
              {/* {addResultSnackbar} */}
              
            </div> 
          </div>
        </div>
      </div>
      {/* <Snackbar 
        text="Maapähkinät on jees"
      /> */}
      </LoggedInContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    drinks: state.drinks,
    drinkList: state.drinkList,
    drinkFilterConditions: state.drinkFilterConditions,
    othDrinkModal: state.othDrinkModal,
    addResultModal: state.addResultModal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDrinks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitCalculator);
