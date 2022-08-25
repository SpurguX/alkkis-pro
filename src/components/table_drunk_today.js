"Use strict";

import React, { Component } from "react";
import _ from "lodash";
import $ from "jquery"
import { langDatatable } from '../utils/lang';
import {
  getVolumeDisplayValue,
  formatUnits
} from "../utils/functions";

$.Datatable = require('datatables.net')

export default class TableDrunkToday extends Component {
  constructor(props) {
    super(props)
    this.tableRef = React.createRef()
    this.table = {}
    this.data = this.formatDataforDatatable()
  }

  componentDidMount() {
    this.initializeDatatable()
  }

  formatDataforDatatable() {
    const entriesByDrink =_.reduce(this.props.entries, (entries, entry) => {
      const { drinkId } = entry.drink
      console.log(_.keys(entries));
      if (_.keys(entries).includes(String(drinkId))) {
        entries[drinkId].drink_quantity += entry.drink_quantity;
        entries[drinkId].drink_entry_units += entry.drink_entry_units;
      } else {
        entries[drinkId] = entry
      }
      return entries
    }, {})


    return _.map(entriesByDrink, entry => {
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

      return {
        drinkName,
        alcContent,
        drinkQuantity: entry.drink_quantity,
        units,
        drinkEntryId: entry.drink_entry_id
      }
    });
  }

  initializeDatatable () {
    this.table = $(this.tableRef.current).DataTable(this.getDatatableConfig())
  }
  getDatatableConfig() {
    const self = this;

    const columns = self.getColumnsDefinition()

    return {
      data: this.data,
      rowId: 'drinkEntryId',
      dom: 't',
      serverSide: false,
      columns,
      language: langDatatable,
      destroy: true, // Clean up possibly existing table
      responsive: {
        details: {
          target: 'tr',
          type: '',
          renderer: (api, rowIdx, columns) => {
            let rowData = self.table.row(rowIdx).data()

            let subRowHtml = '<td>'
            for (const col of columns) {
              if (col.hidden && col.title) {
                const colData = rowData[Object.keys(rowData)[col.columnIndex]]
                const displayValue = colData.display ? colData.display : colData
                subRowHtml += col.title + ": " + displayValue + "<br>"
              }
            }
            subRowHtml += '</td>'
            return subRowHtml
          }
        }
      }
    }
  }

  getColumnsDefinition () {
    return [
      { title: 'Juoma', data: 'drinkName', responsivePriority: 1, className: 'text-nowrap' },
      {
        title: 'Vahvuus',
        data: 'alcContent',
        type: 'numeric',
        render: { _: 'display', sort: 'value' },
        responsivePriority: 3,
      },
      { title: 'Kpl', data: 'drinkQuantity', type: 'numeric', responsivePriority: 2, },
      {
        title: 'Annokset',
        data: 'units',
        type: 'numeric',
        render: { _: 'display', sort: 'value' },
        responsivePriority: 4,
      },
    ];
  }

  render() {
    return (
      <div className="container-wooden-borders">
        <div className="bg-blackboard">
          <table className="alkkis-table alkkis-table--narrow alkkis-table--no-body-bottom-border font-large" ref={this.tableRef}></table>
        </div>
      </div>
    );
  }
}
