"Use strict";

import React from "react";
import ReactSelect from 'react-select';
import { DATATABLE_PAGE_SIZE_OPTIONS } from "../utils/constants";

export const DiaryTableSearch = (props) => {
  return (
    <div className="p-3 d-flex flex-row align-items-center mb-2">
    <label className="control-label font-medium mr-2 mb-0">
      Sivun pituus
    </label>
    <ReactSelect
      value={props.pageSize}
      onChange={(item) => props.handlePageSizeSelection(item)}
      className="react-select font-medium w-auto react-select--compact"
      classNamePrefix="react-select"
      options={DATATABLE_PAGE_SIZE_OPTIONS}
    />
    <label className="control-label font-medium ml-auto mr-2 mb-0">
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