import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { formatJSDate, calculateTotalUnits, sortEntriesbyDrinkDate } from '../helpers/functions';

export default class DiaryTableWeekView extends Component {

  getStartAndEndOfWeekDates(dateAsMoment) {
    let weekdayOfEntry = dateAsMoment.isoWeekday();
    let startOfWeekDate = _.cloneDeep(dateAsMoment);
    let endOfWeekDate = _.cloneDeep(dateAsMoment);
    startOfWeekDate.date(dateAsMoment.date() - (weekdayOfEntry - 1));
    endOfWeekDate.date(dateAsMoment.date() + (7 - weekdayOfEntry));
    startOfWeekDate = startOfWeekDate._d;
    endOfWeekDate = endOfWeekDate._d;
    return [startOfWeekDate, endOfWeekDate];
  }

  entriesToWeeklyForm() {
    const entries = sortEntriesbyDrinkDate(this.props.entries);
    let entry = entries[Object.keys(entries)[0]];
    let weeklyRows = {};
    if (entry !== undefined) {
      for (let index in entries) {
        let drinkDate = new Date(Date.parse(entries[index].drink_date));
        let dateAsMoment = moment(drinkDate);
        let weekOfDate = dateAsMoment.isoWeek();
        let yearAndWeek = dateAsMoment.year() + ":" + weekOfDate;
        if (Object.keys(weeklyRows).includes(yearAndWeek)) {
          weeklyRows[yearAndWeek].units +=  entries[index].drink_entry_units;
        } else {
          let weeklyRow = {};
          weeklyRow.units = entries[index].drink_entry_units;
          weeklyRow.weekNum = weekOfDate;
          let startAndEnd = this.getStartAndEndOfWeekDates(dateAsMoment);
          weeklyRow.startOfWeek = startAndEnd[0];
          weeklyRow.endOfWeek = startAndEnd[1];
          weeklyRows[`${yearAndWeek}`] = weeklyRow;
        }
      }
      return weeklyRows;
    }
  }

  renderEntries() {
    let weeklyRows = this.entriesToWeeklyForm();
    return _.map(weeklyRows, row => {
      let { units, weekNum } = row;
      let { startOfWeek, endOfWeek } = row;
      return (
        <tr key={startOfWeek}>
          <td>
          {formatJSDate(startOfWeek)} - {formatJSDate(endOfWeek)}
          </td>
          <td><span className="badge">{weekNum}</span></td>
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
              <th>Päivämäärä</th>
              <th>Viikko</th>
              <th>Annokset</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEntries()}
          </tbody> 
          <tfoot>
            <tr>
              <th />
              <th />
              <th>Annokset yht.</th>
            </tr>
            <tr>
              <td />
              <td />
              <td>{totalUnits}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
