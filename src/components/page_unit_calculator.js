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
import { fetchDrinks, setUnitsInList } from "../actions";
import LoggedInContainer from "./logged_in_container";
import UnitCounter from "./unit_counter";

class UnitCalculator extends Component {
  componentDidMount() {
    this.props.fetchDrinks();
  }

  componentDidUpdate () {
    const unitsInList = this.countUnitsInList(this.props.drinkList)
    this.props.setUnitsInList(unitsInList)
  }

  countUnitsInList(list) {
    let units = 0.0;

    if (!_.isEmpty(list)) {
      _.forIn(list, (item) => {
        units += item.units * item.quantity;
      });
    }

    return units
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
            <div className="row pt-4 justify-content-center sticky-element">
              <UnitCountDisplayer units={this.props.unitsInList} headingTag="h3" />
            </div>
            <div className="row pt-2">
              <div className="col">
                <div className="d-flex justify-content-center">
                  <div className="container-wooden-borders mt-2">
                    <div className="header-wrapper">
                      <h4 className="text-center text-whitesmoke">
                        Juodut juomat
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col drink-icon-button-col--chosen-drinks">
                <div className="drink-icon-button-grid-wrapper">
                  <div className="row justify-content-center drink-icon-button-grid-container">
                    {!(
                      this.props.drinkList &&
                      Object.keys(this.props.drinkList)?.length
                    ) && (
                      <div className="container-wooden-borders mt-2">
                        <div className="header-wrapper px-2">
                          <h6 className="text-center text-gray">
                            Aloita valitsemalla
                            <br />
                            juomia
                          </h6>
                        </div>
                      </div>
                    )}
                    {this.props.drinkList != null &&
                      this.renderDrinkIconChosenButtons(this.props.drinkList)}
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-2">
              <div className="col">
                <div className="d-flex justify-content-center">
                  <div className="container-wooden-borders mt-2">
                    <div className="header-wrapper">
                      <h4 className="text-center text-whitesmoke">
                        Valitse juomia
                      </h4>
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
                      : 'Loading...'}
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
                  <AddToDiaryBtn />
                </div>
              </div>
            </div>
            <div className="row pt-2">
              <div className="col">
                <div className="row justify-content-center">
                  <EmptyDrinkListBtn />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Larger-than-small screens */}
        {!this.props.screenSize.smallScreen && (
          <div className="container-unit-calculator">
            <div className="row pt-4 justify-content-center">
              <UnitCountDisplayer units={this.props.unitsInList} headingTag="h2" />
            </div>
            <div className="row pt-2">
              <div className="col-6">
                <div className="d-flex justify-content-center">
                  <div className="container-wooden-borders">
                    <div className="header-wrapper">
                      <h4 className="text-center text-whitesmoke">
                        Valitse juomia
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 text-center">
                <div className="d-flex justify-content-center">
                  <div className="container-wooden-borders">
                    <div className="header-wrapper">
                      <h4 className="text-center text-whitesmoke">
                        Juodut juomat
                      </h4>
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
                      : 'Loading...'}
                    <OtherDrinkButton />
                  </div>
                  {otherDrinkModal}
                </div>
              </div>
              <div className="col-6 drink-icon-button-col--chosen-drinks">
                <div className="drink-icon-button-grid-wrapper">
                  <div className="row justify-content-center drink-icon-button-grid-container">
                    {!(
                      this.props.drinkList &&
                      Object.keys(this.props.drinkList)?.length
                    ) && (
                      <div className="container-wooden-borders mt-5">
                        <div className="header-wrapper px-2">
                          <h6 className="text-center text-gray">
                            Aloita valitsemalla
                            <br />
                            juomia
                          </h6>
                        </div>
                      </div>
                    )}
                    {this.props.drinkList != null &&
                      this.renderDrinkIconChosenButtons(this.props.drinkList)}
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
    screenSize: state.screenSize,
    unitsInList: state.unitsInList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDrinks, setUnitsInList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitCalculator);
