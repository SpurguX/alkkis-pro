import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from "redux";
import DrinkIconButton from "./drink_icon_button";
import DrinkIconChosenButton from "./drink_icon_chosen_button";
import DrinkFilterBtnGroup from "./drink_filter_btn_group";
import OtherDrinkButton from "./other_drink_button";
import OtherDrinkModal from "./other_drink_modal";
import UnitCountDisplayer from "./unit_count_displayer";
import DrinkDatePicker from "./drink_datepicker";
import DrinkListButtons from "./drink_list_buttons";
import AddToDiaryBtn from './add_to_diary_btn';
import EmptyDrinkListBtn from './empty_drink_list_btn.js';
import { fetchDrinks } from "../actions";
import LoggedInContainer from "./logged_in_container";

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

    /** render doesn't follow DRY at the moment */
    return (
      <LoggedInContainer>
      {/* Small screens */}
      {this.props.screenSize.smallScreen && (
        <div className="container-unit-calculator">
          <div className="row pt-4 justify-content-center">
            <UnitCountDisplayer />
          </div>
          <div className="row pt-2">
            <div className="col">
              <div className="d-flex justify-content-center">
                <div className="container-wooden-borders">
                  <div className="header-wrapper">
                    <h5 className="text-center text-whitesmoke">Juodut juomat</h5>
                    { !(this.props.drinkList && Object.keys(this.props.drinkList)?.length) && (
                      <h6 className="text-center text-whitesmoke mt-2">Aloita valitsemalla juomia</h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col drink-icon-button-col--chosen-drinks">
              <div className="drink-icon-button-grid-wrapper">
                <div className="row justify-content-center drink-icon-button-grid-container">
                    {this.props.drinkList != null
                      && this.renderDrinkIconChosenButtons(this.props.drinkList)
                    }
                  </div>
              </div>
            </div>
          </div>
          <div className="row pt-2">
            <div className="col">
              <div className="d-flex justify-content-center">
                <div className="container-wooden-borders">
                  <div className="header-wrapper">
                    <h5 className="text-center text-whitesmoke">Valitse juomia</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col drink-icon-button-col--drinks">
              <div className="drink-icon-button-grid-wrapper">
                <div className="row justify-content-center drink-icon-button-grid-container">
                  {this.props.drinks != null
                    ? this.renderDrinkIconButtons(this.props.drinks)
                    : "Loading..."}
                  <OtherDrinkButton />
                </div>
                {otherDrinkModal}
              </div>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col">
              <div className="row justify-content-center">
                <div className="container-wooden-borders">
                  <DrinkFilterBtnGroup />
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-2 ">
            <div className="col">
              <div className="row justify-content-center">
                <DrinkDatePicker />
              </div>
            </div>
          </div>
          <div className="row pt-2">
            <div className="col">
              <div className="row justify-content-center">
                <AddToDiaryBtn/>
              </div>
            </div>
          </div>
          <div className="row pt-2">
            <div className="col">
              <div className="row justify-content-center">
                <EmptyDrinkListBtn/>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Larger-than-small screens */}
      {!this.props.screenSize.smallScreen && (
        <div className="container-unit-calculator">
          <div className="row pt-4 justify-content-center">
            <UnitCountDisplayer />
          </div>
          <div className="row pt-2">
            <div className="col-6">
              <div className="d-flex justify-content-center">
                <div className="container-wooden-borders">
                  <div className="header-wrapper">
                    <h4 className="text-center text-whitesmoke">Valitse juomia</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 text-center">
              <div className="d-flex justify-content-center">
                <div className="container-wooden-borders">
                  <div className="header-wrapper">
                    <h4 className="text-center text-whitesmoke">Juodut juomat</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6 drink-icon-button-col--drinks">
              <div className="drink-icon-button-grid-wrapper">
                <div className="row justify-content-center drink-icon-button-grid-container">
                  {this.props.drinks != null
                    ? this.renderDrinkIconButtons(this.props.drinks)
                    : "Loading..."}
                  <OtherDrinkButton />
                </div>
                {otherDrinkModal}
              </div>
            </div>
            <div className="col-6 drink-icon-button-col--chosen-drinks">
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
            <div className="col-6">
              <div className="row justify-content-center">
                <div className="container-wooden-borders">
                  <DrinkFilterBtnGroup />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row justify-content-center mb-2">
                <DrinkDatePicker />
              </div>
              <div className="row justify-content-center">
                <DrinkListButtons />
              </div>
            </div>
          </div>
        </div>
        )}
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
    screenSize: state.screenSize
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDrinks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitCalculator);
