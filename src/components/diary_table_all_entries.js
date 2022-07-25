import React, { Component } from "react";
import ReactDOM from 'react-dom';
import _ from "lodash";
import DeleteEntryBtn from "./delete_entry_btn";
import EditEntryBtn from "./edit_entry_btn";
import {
  formatDBDate,
  calculateTotalUnits,
  getVolumeDisplayValue,
  formatUnits
} from "../utils/functions";
import { DATATABLE_PAGE_SIZE_OPTIONS } from "../utils/constants";
import { langDatatable } from '../utils/lang';
import $ from "jquery"
import { DiaryTableSearch } from "./diary_table_search";
import { Provider } from 'react-redux';
import { initializedReduxStore } from '../index'

$.Datatable = require('datatables.net')

export default class DiaryTableAllEntries extends Component {
  constructor(props) {
    super(props)
    this.tableRef = React.createRef()
    this.table = {}
    this.data = this.formatDataforDatatable()
    this.state = {
      pageSize: DATATABLE_PAGE_SIZE_OPTIONS[1],
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
    this.data = this.formatDataforDatatable()
    this.table.clear()
    this.table.rows.add(this.data)
    this.table.draw()
  }

  formatDataforDatatable() {
    return _.map(this.props.entries, entry => {
      const { drink } = entry;
      const alcContent = {
        value: drink.alcContent,
        display: drink.alcContent.toLocaleString('fi')
      }
      const units = {
        value: entry.drink_entry_units,
        display: formatUnits(entry.drink_entry_units)
      }
      const drinkName = `${drink.drinkName} ${getVolumeDisplayValue(drink.volume)}`
      const drinkDate = {
        value: entry.drink_date,
        display: formatDBDate(entry.drink_date)
      }

      return {
        drinkDate,
        drinkName,
        alcContent,
        drinkQuantity: entry.drink_quantity,
        units,
        entry: entry,
        drinkEntryId: entry.drink_entry_id
      }
    });
  }

  initializeDatatable () {
    this.table = $(this.tableRef.current).DataTable(this.getDatatableConfig());

    this.addDatatableEventListeners()
    this.addDatatableFooter()
    this.initializeDatatablePageInfo()
  }

  getDatatableConfig() {
    const self = this;

    const columns = self.getColumnsDefinition()

    return {
      data: this.data,
      rowId: 'drinkEntryId',
      dom: 'rt<"pagination-container"ip>',
      serverSide: false,
      columns,
      order: [0, 'desc'], // initial order
      language: langDatatable,
      createdRow: function(row, data, dataIndex) {
        self.renderRowButtons(row, data);
      },
      destroy: true // Clean up possibly existing table
    }
  }

  getColumnsDefinition () {
    return [
      {
        title: 'Päivämäärä',
        data: 'drinkDate',
        type: 'date',
        render: { _: 'display', sort: 'value' },
      },
      { title: 'Juoma', data: 'drinkName' },
      {
        title: 'Vahvuus',
        data: 'alcContent',
        type: 'numeric',
        render: { _: 'display', sort: 'value' },
      },
      { title: 'Kpl', data: 'drinkQuantity', type: 'numeric' },
      {
        title: 'Annokset',
        data: 'units',
        type: 'numeric',
        render: { _: 'display', sort: 'value' },
      },
      { title: '', data: 'entry', searchable: false, orderable: false },
      { title: '', data: 'drinkEntryId', searchable: false, orderable: false },
    ];
  }

  renderRowButtons(row, data) {
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

  addDatatableEventListeners() {
    const self = this;

    this.table.on('page.dt',() => {
      const pageInfo = this.table.page.info()
      this.setState({ ...this.state, pageInfo })
    });

    this.table.on('search.dt', function (e) {
      self.updateFooterData()
    })
  }

  updateFooterData() {
    var filteredRows = this.table.rows({filter: 'applied'}).data();

    const quantity = filteredRows.reduce((prev, curr) => {
      return prev + curr.drinkQuantity
    }, 0)
    document.getElementById('total-quantity').innerText = quantity.toLocaleString('fi')

    const units = filteredRows.reduce((prev, curr) => {
      return prev + curr.units.value
    }, 0)
    document.getElementById('total-units').innerText = formatUnits(units);
  }

  /** Using react to render elements/JSX in the datatable footer turned out to be too difficult so vanilla JS is used
   * here to programmatically create and add the footerq elements
   */
  addDatatableFooter () {
    const trHeadings = this.createFooterHeadingRow()
    const trData = this.createFooterDataRow()

    const tbody = document.getElementsByTagName('tbody')[0]
    const tfoot = document.createElement('tfoot')

    tfoot.appendChild(trHeadings)
    tfoot.appendChild(trData)
    tbody.after(tfoot)
  }

  createFooterHeadingRow () {
    const trHeadings = document.createElement('tr')

    for (let i=0; i < 3; i++) trHeadings.appendChild(document.createElement('th'));

    const thCount = document.createElement('th')
    thCount.innerText = 'Kpl yht.'
    trHeadings.appendChild(thCount)

    const thUnits = document.createElement('th')
    thUnits.innerText = 'Annokset yht.'
    trHeadings.appendChild(thUnits)

    for (let i=0; i < 2; i++) trHeadings.appendChild(document.createElement('th'));

    return trHeadings
  }

  createFooterDataRow () {
    const trData = document.createElement('tr')

    for (let i=0; i < 3; i++) trData.appendChild(document.createElement('td'));

    const tdCount = document.createElement('td')
    tdCount.setAttribute('id', 'total-quantity')
    tdCount.innerText = this.calculateTotalQuantity()
    trData.appendChild(tdCount)

    const tdUnits = document.createElement('td')
    tdUnits.setAttribute('id', 'total-units')
    const totalUnits = formatUnits(calculateTotalUnits(this.props.entries));
    tdUnits.innerText = totalUnits
    trData.appendChild(tdUnits)

    return trData
  }

  initializeDatatablePageInfo () {
    const pageInfo = this.table.page.info()
    this.setState({ ...this.state, pageInfo })
  }

  calculateTotalQuantity() {
    const { entries } = this.props;
    let totalQuantity = 0;
    _.forEach(entries, obj => {
      totalQuantity += obj.drink_quantity;
    });
    return totalQuantity;
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
    return (
      <div className="container-wooden-borders">
        <div className="bg-blackboard">
          <DiaryTableSearch
            pageSize={this.state.pageSize}
            searchQuery={this.state.searchQuery}
            handlePageSizeSelection={this.handlePageSizeSelection.bind(this)}
            handleSearch={this.handleSearch.bind(this)}
          />
          <table className="alkkis-table" ref={this.tableRef}>
          </table>
        </div>
      </div>
    );
  }
}
