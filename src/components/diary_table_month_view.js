import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { sortEntriesbyDrinkDate, calculateTotalUnits, capitalizeFirstLetter } from '../utils/functions';
import $ from "jquery"

$.Datatable = require('datatables.net')

export default class DiaryTableMonthView extends Component {
  constructor(props) {
    super(props)
    this.tableRef = React.createRef()
    this.table = {}
    this.data = this.getEntryDisplayData()
  }

  componentDidMount() {
    this.table = $(this.tableRef.current).DataTable({
      data: this.data,
      columns: [
        { title: "Kuukausi"},
        { title: "Annokset"},
      ],
      destroy: true
    })
  }

  entriesToMonthlyForm() {
    const entries = sortEntriesbyDrinkDate(this.props.entries);
    let entry = entries[Object.keys(entries)[0]];
    let monthlyRows = {};
    if (entry !== undefined) {
      for (var index in entries) {
        let drinkDate = new Date(Date.parse(entries[index].drink_date));
        let dateAsMoment = moment(drinkDate);
        let monthAndYear = dateAsMoment.format("YYYY MMMM");
        if (Object.keys(monthlyRows).includes(monthAndYear)) {
          monthlyRows[monthAndYear].units += entries[index].drink_entry_units;
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

  getEntryDisplayData() {
    const monthlyRows = this.entriesToMonthlyForm();
    return _.map(monthlyRows, row => {
      let { units, monthAndYear } = row;
      monthAndYear = capitalizeFirstLetter(monthAndYear);
      units = units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      return [
        monthAndYear,
        units
      ]
    });
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
      <div className="container-wooden-borders">
        <div className="bg-blackboard">
        <table className="alkkis-table" ref={this.tableRef}></table>
        {/* <table className="alkkis-table bg-blackboard">
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
        </table> */}
        </div>
      </div>
    );
  }
}
