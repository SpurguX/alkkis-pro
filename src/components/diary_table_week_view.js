import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { formatJSDate } from '../helpers/functions';

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
    const { entries } = this.props;
    let entry = entries[Object.keys(entries)[0]];
    let weeklyRows = {};
    if (entry !== undefined) {
      for (var index in entries) {
        let drinkDate = new Date(Date.parse(entries[index].drink_date));
        let dateAsMoment = moment(drinkDate);
        let weekOfDate = dateAsMoment.isoWeek();
        if (Object.keys(weeklyRows).includes(weekOfDate.toString())) {
          weeklyRows[weekOfDate].units +=  entries[index].drink_entry_units;
        } else {
          let weeklyRow = {};
          weeklyRow.units = entries[index].drink_entry_units;
          weeklyRow.weekNum = weekOfDate;
          let startAndEnd = this.getStartAndEndOfWeekDates(dateAsMoment);
          weeklyRow.startOfWeek = formatJSDate(startAndEnd[0]);
          weeklyRow.endOfWeek = formatJSDate(startAndEnd[1]);
          weeklyRows[`${weekOfDate}`] = weeklyRow;
        }
      }
      return weeklyRows;
    }
  }

  calculateTotalUnits() {
    const { entries } = this.props;
    let totalUnits = 0.0;
    _.forEach(entries, (obj, key) => {
      totalUnits += obj.drink_entry_units;
    });
    return totalUnits.toFixed(1);
  }

  renderEntries(weeklyRows) {
    return _.map(weeklyRows, row => {
      let { units, weekNum } = row;
      let { startOfWeek, endOfWeek } = row;
      return (
        <tr key={weekNum}>
          <td>{weekNum}</td>
          <td>
          {startOfWeek} - {endOfWeek}
          </td>
          <td>{units.toFixed(1)}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div id="diary-table-container" className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Viikko</th>
              <th>Päivämäärä</th>
              <th>Annokset</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEntries(this.entriesToWeeklyForm())}
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
              <td>{this.calculateTotalUnits()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
