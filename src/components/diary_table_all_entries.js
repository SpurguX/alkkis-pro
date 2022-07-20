import React, { Component } from "react";
import ReactDOM from 'react-dom';
import _ from "lodash";
import DeleteEntryBtn from "./delete_entry_btn";
import EditEntryBtn from "./edit_entry_btn";
import {
  formatJSDate,
  calculateTotalUnits,
  sortEntriesbyDrinkDate,
} from "../utils/functions";
import { getVolumeDisplayValue } from '../utils/functions';
import $ from "jquery"
import ReactSelect from 'react-select';
import { Provider } from 'react-redux';
import { initializedReduxStore } from '../index'

$.Datatable = require('datatables.net')

export default class DiaryTableAllEntries extends Component {
  constructor(props) {
    super(props)
    this.tableRef = React.createRef()
    this.table = {}
    this.data = this.getEntryDisplayData()
    this.pageSizeOptions = [
      { value: -1, label: 'Kaikki'},
      { value: 10, label: "10" },
      { value: 25, label: "25" },
      { value: 50, label: "50" },
      { value: 100, label: "100" }
    ]
    this.state = {
      pageSize: this.pageSizeOptions[1],
      searchQuery: '',
      pageInfo: {},
    }
  }

  componentDidMount() {
    this.initializeDatatable()
  }

  componentDidUpdate(prevProps) {
    this.conditionallyRefreshTableWithNewData(prevProps)
  }

  conditionallyRefreshTableWithNewData(prevProps) {
    const prevEntries = prevProps.entries
    const currEntries = this.props.entries

    if (
      typeof currEntries === 'object' &&
      typeof prevEntries === 'object' &&
      (
        Object.keys(currEntries).length !== Object.keys(prevEntries).length ||
       !(_.isEqual(currEntries, prevEntries))
      )
    ) {
      this.refreshTableWithNewData()
    }
  }

  refreshTableWithNewData() {
    this.data = this.getEntryDisplayData()
    this.table.clear()
    this.table.rows.add(this.data)
    this.table.draw()
  }

  initializeDatatable () {
    const self = this;

    this.table = $(this.tableRef.current).DataTable({
      data: this.data,
      dom: 'rt<"pagination-container"ip>',
      serverSide: false,
      columns: [
        { title: "Päivämäärä", data: 'drinkDate' },
        { title: "Juoma", data: 'drinkName'},
        { title: "Vahvuus", data: 'alcContent'},
        { title: "Kpl", data: 'drinkQuantity'},
        { title: "Annokset", data: 'units'},
        { title: "", data: 'entry', searchable: false, },
        { title: "", data: 'drinkEntryId', searchable: false },
      ],
      language: {
        info: "Näytetään rivit _START_ &ndash; _END_ &nbsp;&nbsp; yhteensä _TOTAL_ riviä",
        paginate: {
            previous: "Edellinen",
            next: "Seuraava",
        },
      },
      createdRow: function(row, data, dataIndex) {
        self.addRowButtons(row, data);
      },
      destroy: true // Clean up possibly existing table
    })

    // initialize pageInfo
    const pageInfo = this.table.page.info()
    this.setState({ ...this.state, pageInfo })

    // add event listener
    this.table.on('page.dt',() => {
      const pageInfo = this.table.page.info()
      this.setState({ ...this.state, pageInfo })
    });
  }

  addRowButtons(row, data) {
    const editEntryBtn = (
      // Need to provide access to store when injecting the component this way
      <Provider store={initializedReduxStore}>
        <EditEntryBtn entry={data.entry} />
      </Provider>
    )
    ReactDOM.render(editEntryBtn, row.cells[5]);

    const deleteEntryBtn = (
      <Provider store={initializedReduxStore}>
        <DeleteEntryBtn drink_entry_id={data.entry.drink_entry_id} />
      </Provider>
    )
    ReactDOM.render(deleteEntryBtn, row.cells[6]);
  }

  calculateTotalQuantity() {
    const { entries } = this.props;
    let totalQuantity = 0;
    _.forEach(entries, obj => {
      totalQuantity += obj.drink_quantity;
    });
    return totalQuantity;
  }

  getEntryDisplayData() {
    console.log('getEntryDisplayData');
    const dateSortedEntries = sortEntriesbyDrinkDate(this.props.entries);
    return _.map(dateSortedEntries, entry => {
      const { drink } = entry;
      const alcContent = drink.alcContent.toLocaleString('fi');
      const units = entry.drink_entry_units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      const drinkName = `${drink.drinkName} ${getVolumeDisplayValue(drink.volume)}`
      const drinkDate = formatJSDate(new Date(entry.drink_date))

      return {
        drinkDate,
        drinkName,
        alcContent,
        drinkQuantity: entry.drink_quantity,
        units,
        entry: entry,
        drinkEntryId: entry.drink_entry_id
      }

      // return (
      //   <tr key={entry.drink_entry_id}>
      //     <td>{formatDBDate(entry.drink_date)}</td>
      //     <td>
      //       {drink.drinkName} {getVolumeDisplayValue(volume)}
      //     </td>
      //     <td className="text-right">{alcContent} <span className="font-christmas">%</span></td>
      //     <td className="text-right">{entry.drink_quantity}</td>
      //     <td className="text-right">{units}</td>
      //     <td>
      //       <EditEntryBtn entry={entry} />
      //     </td>
      //     <td>
      //       <DeleteEntryBtn drink_entry_id={entry.drink_entry_id} />
      //     </td>
      //   </tr>
      // );
    });
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

  handlePageSizeSelection(item) {
    this.setState({ ...this.state, pageSize: item })
    this.table.page.len(item.value).draw()
  }

  handleSearch(event) {
    const query = event.target.value
    this.setState({ ...this.state, searchQuery: query })
    this.table.search(query).draw()
  }

  render() {
    let totalUnits = calculateTotalUnits(this.props.entries).toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

    return (
      <div className="container-wooden-borders">
        <div className="bg-blackboard">
          <div className="p-3 d-flex flex-row align-items-center mb-2">
            <label className="control-label font-medium mr-2 mb-0">
              Sivun pituus
            </label>
            <ReactSelect
              value={this.state.pageSize}
              onChange={(item) => this.handlePageSizeSelection(item)}
              className="react-select font-medium w-auto react-select--compact"
              classNamePrefix="react-select"
              options={this.pageSizeOptions}
            />
            <label className="control-label font-medium ml-auto mr-2 mb-0">
              Haku
            </label>
            <input
              type="text"
              name="drinkName"
              className="form-control input-lg font-medium w-auto"
              value={this.state.searchQuery}
              onChange={(event) => this.handleSearch(event)}
            />
          </div>
          {/* <div className="p-2 d-flex flex-row align-items-center">
            Sivu: {this.state.pageInfo?.page + 1}  -  Sivuja yht: {this.state.pageInfo?.pages}
          </div> */}
          <table className="alkkis-table" ref={this.tableRef}>
            {/* TODO decide whether footer is needed */}
            {/* <tfoot>
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
            </tfoot> */}
          </table>
        </div>
      </div>
    );
  }
}
