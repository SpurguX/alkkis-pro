import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { countUnits } from "../helpers/functions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideOthDrinkModal, updateDrinkList } from "../actions";
import axios from "axios";
import qs from "qs";

class OtherDrinkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drinkName: "",
      volume: 0.0,
      alcContent: 0.0,
      units: 0.0
    };
  }

  handleDrinkNameChange = event => {
    this.setState({ drinkName: event.target.value });
  };

  handleVolumeSliderChange(value) {
    let volFloat = +value.toFixed(2);
    this.setState({ volume: volFloat }, () => this.updateUnits());
  }

  handleVolumeFieldChange = event => {
    let volFloat = +event.target.value;
    if (volFloat > 1.0) {
      volFloat = 1.0;
    }
    this.setState({ volume: volFloat }, () => this.updateUnits());
  };

  handleAlcContentSliderChange(value) {
    let alcFloat = +value.toFixed(2);
    this.setState({ alcContent: alcFloat }, () => this.updateUnits());
  }

  handleAlcContentFieldChange = event => {
    let alcFloat = +event.target.value;
    if (alcFloat > 100) {
      alcFloat = 100;
    }
    this.setState({ alcContent: alcFloat }, () => this.updateUnits());
  };

  updateUnits() {
    const { volume, alcContent } = this.state;
    const units = countUnits(volume, alcContent);
    this.setState({ units: units });
  }

  addNewDrinkToDbAndList() {
    let { drinkName, alcContent, units, volume } = this.state;
    if (drinkName === "") {
      drinkName = "Muu juoma";
    }
    const data = {
      drinkName: drinkName,
      volume: volume,
      alcContent: alcContent,
      units: units
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: "http://jessetaina.info:8080/save_other_drink"
    };

    axios(options)
      .then(response => {
        this.props.updateDrinkList(response.data);
      })
      .catch(response => {
        console.log("Error", response.status);
      });
  }

  handleAdd = event => {
    event.preventDefault();
    this.addNewDrinkToDbAndList();
    this.props.hideOthDrinkModal();
  };

  render() {
    const { drinkName, volume, alcContent } = this.state;
    const units = this.state.units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-3">Juoman nimi:</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="drinkName"
              className="form-control input-lg"
              value={drinkName}
              onChange={this.handleDrinkNameChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Tilavuus (l):</label>
          <div className="col-sm-2">
            <input
              type="number"
              max={1.0}
              step={0.01}
              name="volume"
              className="form-control input-lg"
              value={volume}
              onChange={this.handleVolumeFieldChange}
            />
          </div>
          <div className="col-sm-6">
            <Slider
              max={1.0}
              step={0.01}
              value={volume}
              onChange={value => this.handleVolumeSliderChange(value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Vahvuus (%):</label>
          <div className="col-sm-2">
            <input
              type="number"
              step={0.1}
              name="alc-content"
              className="form-control input-lg"
              value={alcContent}
              onChange={this.handleAlcContentFieldChange}
            />
          </div>
          <div className="col-sm-6">
            <Slider
              max={100}
              step={0.1}
              value={alcContent}
              onChange={value => this.handleAlcContentSliderChange(value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Annokset:</label>
          <div className="col-sm-2">
            <div id="units-text">{units}</div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-6 col-sm-offset-3">
            <button className="btn btn-default" onClick={this.handleAdd}>
              Tallenna juoma ja lisää listaan
            </button>
          </div>
          <div className="col-sm-2 close-btn-div">
            <button
              type="button"
              className="btn btn-default"
              onClick={this.props.hideOthDrinkModal}
            >
              Sulje
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideOthDrinkModal, updateDrinkList }, dispatch);
}

export default connect(null, mapDispatchToProps)(OtherDrinkForm);
