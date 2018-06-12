import React, { Component } from 'react';
import _ from 'lodash';
import DeleteEntryBtn from './delete_entry_btn';
import EditEntryBtn from './edit_entry_btn';
import { formatDBDate, calculateTotalUnits } from '../helpers/functions';

export default class DiaryTableAllEntries extends Component {

    compareDrinkDates(a, b) {
        if (a.drink_date < b.drink_date) {
            return -1;
        }
        if (a.drink_date > b.drink_date) {
            return 1;
        }
        return 0;
    }

    sortEntriesbyDrinkDate() {
        const { entries } = this.props;
        let dateSortedEntries = [];
        Object.keys(entries).forEach((key) => {
            dateSortedEntries.push(entries[key])
        })
        dateSortedEntries.sort(this.compareDrinkDates);
        return dateSortedEntries;
    }

    calculateTotalQuantity() {
        const { entries } = this.props;
        let totalQuantity = 0;
        _.forEach(entries, (obj) => {
            totalQuantity += (obj.drink_quantity);
        })
        return totalQuantity
    }

    renderEntries() {
        const dateSortedEntries = this.sortEntriesbyDrinkDate();
        return(
            _.map(dateSortedEntries, entry => {
                let { drink } = entry;
                return (
                    <tr key={entry.drink_entry_id}>
                        <td>{formatDBDate(entry.drink_date)}</td>
                        <td>{drink.drinkName} {drink.volume} l - {drink.alcContent} %</td>
                        <td>{entry.drink_quantity}</td>
                        <td>{entry.drink_entry_units.toFixed(1)}</td>
                        <td><EditEntryBtn entry={entry} /></td>
                        <td><DeleteEntryBtn drink_entry_id={entry.drink_entry_id} /></td>
                    </tr>
                )
            })
        )
    }

    render() {
        return(
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
                    <tbody>
                        {this.renderEntries()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Kpl yht.</th>
                            <th>Annokset yht.</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>{this.calculateTotalQuantity()}</td>
                            <td>{calculateTotalUnits(this.props.entries)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

           
        )
    }
}

