import React, { Component } from "react";
import { connect } from "react-redux";
import UnitCounter from "./unit_counter";

class UnitCountDisplayer extends Component {
  render() {
    let totalUnits = this.props.unitsInList.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return (
      <div className="header-container-borders">
        <div className="header-wrapper">
          <h3 className="unit-count-header">Annoksia: <span className="unit-count-number">{totalUnits}</span></h3>
        </div>
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
