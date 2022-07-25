import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { formatJSDate, formatUnits } from '../utils/functions';
import { DATATABLE_PAGE_SIZE_OPTIONS } from "../utils/constants";
import $ from "jquery"
import { DiaryTableSearch } from "./diary_table_search";
import { langDatatable } from '../utils/lang';

$.Datatable = require('datatables.net')

export default class DiaryTableWeekView extends Component {
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

  formatDataforDatatable() {
    return _.reduce(this.props.entries, (weeklyData, entry) => {
      let drinkDate = new Date(Date.parse(entry.drink_date));
      let dateAsMoment = moment(drinkDate);
      let weekNumOfDate = dateAsMoment.isoWeek();
      let yearAndWeek = dateAsMoment.year() + ":" + weekNumOfDate;

      let existingWeek = _.find(weeklyData, (obj) => {
        return obj.yearAndWeek === yearAndWeek
      })

      if (existingWeek) {
        existingWeek.units.value += entry.drink_entry_units
        existingWeek.units.display = formatUnits(existingWeek.units.value)
      } else {
        const [startOfWeek, endOfWeek ] = this.getStartAndEndOfWeekDates(dateAsMoment);
        const formattedDateRange = `${formatJSDate(startOfWeek)} - ${formatJSDate(endOfWeek)}`;

        weeklyData.push({
          yearAndWeek,
          week: {
            display: weekNumOfDate,
            value: drinkDate
          },
          dateRange: {
            display: formattedDateRange,
            value: drinkDate
          },
          units: {
            display: formatUnits(entry.drink_entry_units),
            value: entry.drink_entry_units
          }
        })
      }

      return weeklyData
    }, [])
  }

  
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
      order: [1, 'desc'], // initial order
      language: langDatatable,
      destroy: true // Clean up possibly existing table
    }
  }

  getColumnsDefinition () {
    return [
      {
        title: 'Viikko',
        data: 'week',
        type: 'date',
        render: { _: 'display', sort: 'value' },
      },
      {
        title: 'Päivämäärät',
        data: 'dateRange',
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
          <table className="alkkis-table" ref={this.tableRef}>
          </table>
        </div>
      </div>
    );
  }
}
