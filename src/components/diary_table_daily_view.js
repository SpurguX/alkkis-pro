"Use strict";

import React, { Component } from "react";
import _ from "lodash";
import { formatUnits, formatDBDate } from '../utils/functions';
import { DATATABLE_PAGE_SIZE_OPTIONS } from "../utils/constants";
import $ from "jquery"
import DiaryTableSearch from "./diary_table_search";
import { langDatatable } from '../utils/lang';

$.Datatable = require('datatables.net')

export default class DiaryTableDailyView extends Component {
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
    return _.reduce(this.props.entries, (dailyData, entry) => {
      // let drinkDate = new Date(Date.parse(entry.drink_date));

      let existingDay = _.find(dailyData, (obj) => {
        return obj.day.value === entry.drink_date
      })

      if (existingDay) {
        existingDay.units.value += entry.drink_entry_units
        existingDay.units.display = formatUnits(existingDay.units.value)
      } else {
        dailyData.push({
          day: {
            display: formatDBDate(entry.drink_date),
            value: entry.drink_date
          },
          units: {
            display: formatUnits(entry.drink_entry_units),
            value: entry.drink_entry_units
          }
        })
      }

      return dailyData

    }, [])
  }

  initializeDatatable () {
    this.table = $(this.tableRef.current).DataTable(this.getDatatableConfig())

    // initialize pageInfo
    const pageInfo = this.table.page.info()
    this.setState({ ...this.state, pageInfo })

    // add event listener
    this.table.on('page.dt',() => {
      const pageInfo = this.table.page.info()
      this.setState({ ...this.state, pageInfo })
    });
  }

  getDatatableConfig () {
    const columns = this.getColumnsDefinition()

    return {
      data: this.data,
      dom: 'rt<"pagination-container"ip>',
      serverSide: false,
      columns,
      order: [0, 'desc'], // initial order
      language: langDatatable,
      destroy: true // Clean up possibly existing table
    }
  }

  getColumnsDefinition () {
    return [
      {
        title: 'Päivä',
        data: 'day',
        type: 'date',
        render: { _: 'display', sort: 'value' },
      },
      { title: 'Annokset',
        data: 'units',
        type: 'numeric',
        render: { _: 'display', sort: 'value' },
      },
    ];
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
          <table className="alkkis-table" ref={this.tableRef}></table>
        </div>
      </div>
    );
  }
}
