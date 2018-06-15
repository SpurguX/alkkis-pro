import React, { Component } from "react";
import _ from "lodash";
import DeleteEntryBtn from "./delete_entry_btn";
import EditEntryBtn from "./edit_entry_btn";
import {
  formatDBDate,
  calculateTotalUnits,
  sortEntriesbyDrinkDate
} from "../helpers/functions";

export default class DiaryTableAllEntries extends Component {
  calculateTotalQuantity() {
    const { entries } = this.props;
    let totalQuantity = 0;
    _.forEach(entries, obj => {
      totalQuantity += obj.drink_quantity;
    });
    return totalQuantity;
  }

  renderEntries() {
    const dateSortedEntries = sortEntriesbyDrinkDate(this.props.entries);
    return _.map(dateSortedEntries, entry => {
      const { drink } = entry;
      const volume = drink.volume.toLocaleString('fi');
      const alcContent = drink.alcContent.toLocaleString('fi');
      const units = entry.drink_entry_units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      return (
        <tr key={entry.drink_entry_id}>
          <td>{formatDBDate(entry.drink_date)}</td>
          <td>
            {drink.drinkName} {volume} l - {alcContent} %
          </td>
          <td>{entry.drink_quantity}</td>
          <td>{units}</td>
          <td>
            <EditEntryBtn entry={entry} />
          </td>
          <td>
            <DeleteEntryBtn drink_entry_id={entry.drink_entry_id} />
          </td>
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
              <th>Juoma</th>
              <th>Kappalemäärä</th>
              <th>Annokset</th>
            </tr>
          </thead>
          <tbody>{this.renderEntries()}</tbody>
          <tfoot>
            <tr>
              <th />
              <th />
              <th>Kpl yht.</th>
              <th>Annokset yht.</th>
            </tr>
            <tr>
              <td />
              <td />
              <td>{this.calculateTotalQuantity()}</td>
              <td>{totalUnits}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
