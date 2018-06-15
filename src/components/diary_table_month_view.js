import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { sortEntriesbyDrinkDate, calculateTotalUnits, capitalizeFirstLetter } from '../helpers/functions';

export default class DiaryTableMonthView extends Component {

  entriesToMonthlyForm() {
    const entries = sortEntriesbyDrinkDate(this.props.entries);
    let entry = entries[Object.keys(entries)[0]];
    let monthlyRows = {};
    if (entry !== undefined) {
      for (var index in entries) {
        let drinkDate = new Date(Date.parse(entries[index].drink_date));
        let dateAsMoment = moment(drinkDate);
        let monthAndYear = dateAsMoment.format("MMMM YYYY");
        if (Object.keys(monthlyRows).includes(monthAndYear)) {
          monthlyRows[monthAndYear].units +=  entries[index].drink_entry_units;
        } else {
          let monthlyRow = {};
          monthlyRow.units = entries[index].drink_entry_units;
          monthlyRow.monthAndYear = monthAndYear;
          monthlyRows[`${monthAndYear}`] = monthlyRow;
        }
      }
      return monthlyRows;
    }
  }

  renderEntries() {
    const monthlyRows = this.entriesToMonthlyForm();
    return _.map(monthlyRows, row => {
      let { units, monthAndYear } = row;
      monthAndYear = capitalizeFirstLetter(monthAndYear);
      return (
        <tr key={monthAndYear}>
          <td>{monthAndYear}</td>
          <td>{units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</td>
        </tr>
      );
    });
  }

  render() {
    let totalUnits = calculateTotalUnits(this.props.entries).toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return (
      <div id="diary-table-container" className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Kuukausi</th>
              <th>Annokset</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEntries()}
          </tbody> 
          <tfoot>
            <tr>
              <th />
              <th>Annokset yht.</th>
            </tr>
            <tr>
              <td />
              <td>{totalUnits}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
