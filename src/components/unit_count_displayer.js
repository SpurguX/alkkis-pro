import React, { Component } from "react";
import { connect } from "react-redux";
import UnitCounter from "./unit_counter";

class UnitCountDisplayer extends Component {
  render() {
    let totalUnits = this.props.unitsInList.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return (
      <div id="unit-counter-container">
        <h4>Annoksia listassa: {totalUnits}</h4>
        <UnitCounter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    unitsInList: state.unitsInList
  };
}

export default connect(
  mapStateToProps,
  null
)(UnitCountDisplayer);
