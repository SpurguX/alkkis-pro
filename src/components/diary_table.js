import React, { Component } from 'react';
import _ from 'lodash';

export default class DiaryTable extends Component {

    formatDate(date) {
        let dd = date.substring(8,10);
        let mm = date.substring(5,7);
        let yyyy = date.substring(0,4);
        return (`${dd}.${mm}.${yyyy}`)
    }

    renderEntries() {
        return(
            _.map(this.props.entries, entry => {
                let { juoma } = entry;
                console.log()
                return (
                    <tr key={entry.drink_entry_id}>
                        <td>{this.formatDate(entry.drink_date)}</td>
                        <td>{entry.drink_entry_units}</td>
                        <td>{juoma.juoma_nimi} {juoma.tilavuus} l</td>
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

