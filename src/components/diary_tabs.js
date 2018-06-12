import React, { Component } from "react";

export default class DiaryTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="diary-tabs-container">
        {/* <table>
          <tr> */}
            <button className="btn btn-default col-sm-4 alkkis-tab">Kaikki merkinnät</button>
            <button className="btn btn-default col-sm-4 alkkis-tab">Viikkonäkymä</button>
            <button className="btn btn-default col-sm-4 alkkis-tab">Kuukausinäkymä</button>
          {/* </tr>
        </table> */}
      </div>
    );
  }
}
