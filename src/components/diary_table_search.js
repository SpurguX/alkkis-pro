"Use strict";

import React from "react";
import ReactSelect from 'react-select';
import { DATATABLE_PAGE_SIZE_OPTIONS } from "../utils/constants";
import { connect } from 'react-redux';

const DiaryTableSearch = (props) => {
  let flexDirection = 'flex-row'
  let marginBottom = 'mb-0'
  let searchLabelMarginLeft = 'ml-auto'

  if (props.screenSize.smallScreen) {
    flexDirection = 'flex-column'
    marginBottom = 'mb-2'
    searchLabelMarginLeft = ''
  }

  return (
    <div className={`p-3 d-flex align-items-center mb-2 ${flexDirection}`}>
      <label className={`control-label font-medium mr-2 ${marginBottom}`}>
        Sivun pituus
      </label>
      <ReactSelect
        value={props.pageSize}
        onChange={(item) => props.handlePageSizeSelection(item)}
        className={`react-select font-medium w-auto react-select--compact ${marginBottom}`}
        classNamePrefix="react-select"
        options={DATATABLE_PAGE_SIZE_OPTIONS}
      />
      <label className={`control-label font-medium mr-2 ${searchLabelMarginLeft} ${marginBottom}`}>
        Haku
      </label>
      <input
        type="text"
        name="drinkName"
        className="form-control input-lg font-medium w-auto"
        value={props.searchQuery}
        onChange={(event) => props.handleSearch(event)}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    screenSize: state.screenSize
  };
}

export default connect(mapStateToProps, null)(DiaryTableSearch);
