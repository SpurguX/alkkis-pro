import React, { Component } from "react";
import _ from "lodash";
import DeleteEntryBtn from "./delete_entry_btn";
import EditEntryBtn from "./edit_entry_btn";
import {
  formatDBDate,
  calculateTotalUnits,
  sortEntriesbyDrinkDate
} from "../utils/functions";
import { getVolumeDisplayValue } from '../utils/functions';

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
      const volume = drink.volume;
      const alcContent = drink.alcContent.toLocaleString('fi');
      const units = entry.drink_entry_units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      return (
        <tr key={entry.drink_entry_id}>
          <td>{formatDBDate(entry.drink_date)}</td>
          <td>
            {drink.drinkName} {getVolumeDisplayValue(volume)}
          </td>
          <td className="text-right">{alcContent} <span className="font-christmas">%</span></td>
          <td className="text-right">{entry.drink_quantity}</td>
          <td className="text-right">{units}</td>
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
      <div className="container-wooden-borders">
        <table className="alkkis-table bg-blackboard">
          <thead>
            <tr>
              <th>Päivämäärä</th>
              <th>Juoma</th>
              <th className="text-right">Vahvuus</th>
              <th className="text-right">Kpl</th>
              <th className="text-right">Annokset</th>
            </tr>
          </thead>
          <tbody>{this.renderEntries()}</tbody>
          <tfoot>
            <tr>
              <th />
              <th />
              <th />
              <th className="text-right">Kpl yht.</th>
              <th className="text-right">Annokset yht.</th>
              <th />
              <th />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td className="text-right">{this.calculateTotalQuantity()}</td>
              <td className="text-right">{totalUnits}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
