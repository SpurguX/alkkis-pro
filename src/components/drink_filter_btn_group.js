import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateDrinkFilterConditions } from "../actions";
import { drinkType } from '../utils/constants';
import _ from "lodash";

class DrinkFilterBtnGroup extends Component {
  handleClick(types) {
    const conditions = [...this.props.drinkFilterConditions];
    for (const t of types) {
      const idx = conditions.findIndex((type) => type === t);
      if (idx >= 0) {
        conditions.splice(idx, 1);
      } else {
        conditions.push(t);
      }
    }
    this.props.updateDrinkFilterConditions(conditions);
  }

  getButtonClass(types) {
    for (const t of types) {
      const idx = _.indexOf(this.props.drinkFilterConditions, t);
      if (idx === -1) return "btn-blackboard--unselected";
    }
    return "";
  }

  getBtnGroupClass () {
    return this.props.screenSize.smallScreen ? 'btn-group-md' : 'btn-group-lg'
  }

  render() {
    const {
      MILD,
      WINE,
      LIQUEUR,
      BOOZE,
    } = drinkType

    return (
      <div className={`btn-group ${this.getBtnGroupClass()}`} role="group">
        <button
          type="button"
          className={`btn btn-blackboard ${this.getButtonClass([MILD])}`}
          onClick={() => this.handleClick([MILD])}
        >
          Miedot
        </button>

        <button
          type="button"
          className={`btn btn-blackboard ${this.getButtonClass([WINE])}`}
          onClick={() => this.handleClick([WINE])}
        >
          Viinit
        </button>
        <button
          type="button"
          className={`btn btn-blackboard ${this.getButtonClass([LIQUEUR, BOOZE])}`}
          onClick={() => this.handleClick([LIQUEUR, BOOZE])}
        >
          { this.props.screenSize.smallScreen ? 'Väkevät' : 'Liköörit ja väkevät'}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    drinkFilterConditions: state.drinkFilterConditions,
    screenSize: state.screenSize
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDrinkFilterConditions }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrinkFilterBtnGroup);
