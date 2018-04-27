import React, { Component } from "react";

export default class OtherDrinkForm extends Component {

  render() {
    return (
      <form className="form-horizontal" action="">
        <div className="form-group">
          <label className="control-label col-sm-2 col-sm-offset-2">
            Tilavuus
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control input-lg"
              placeholder="0,5 l"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 col-sm-offset-2">
            Vahvuus
          </label>
          <div className="col-sm-4">
            <input
              type="password"
              className="form-control input-lg"
              placeholder="4,7 %"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-4 col-sm-offset-4">
            <input
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              value="Lisää listaan"
            />
          </div>
        </div>
      </form>
    );
  }
}
