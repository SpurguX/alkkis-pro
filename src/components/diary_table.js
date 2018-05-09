import React, { Component } from 'react';
import _ from 'lodash';

export default class DiaryTable extends Component {

    formatDate(date) {
        let dd = date.substring(8,10);
        let mm = date.substring(5,7);
        let yyyy = date.substring(0,4);
        return (`${dd}.${mm}.${yyyy}`)
    }

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

    renderEntries() {
        const dateSortedEntries = this.sortEntriesbyDrinkDate();
    
        return(
            _.map(dateSortedEntries, entry => {
                let { drink } = entry;
                return (
                    <tr key={entry.drink_entry_id}>
                        <td>{this.formatDate(entry.drink_date)}</td>
                        <td>{entry.drink_entry_units.toFixed(1)}</td>
                        <td>{drink.drinkName} {drink.volume} l - {drink.alcContent} %</td>
                        <td>{entry.drink_quantity}</td>
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
                            <th>Pvm</th>
                            <th>Annokset</th>
                            <th>Juoma</th>
                            <th>Kappalemäärä</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderEntries()}
                    </tbody>
                </table>
            </div>

           
        )
    }
}

