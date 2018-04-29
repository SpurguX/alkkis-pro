import React, { Component } from "react";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import { countUnits } from '../helpers/functions';

export default class OtherDrinkForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      volume: 0.00,
      alcContent: 0.0,
      units: 0.00,
    }
  }

  handleVolumeSliderChange(value) {
    let volFloat = +(value).toFixed(2);
    this.setState({volume: volFloat});
  }

  handleVolumeFieldChange = (event) => {
    let volFloat = +(event.target.value);
    if (volFloat > 1.00) {
      volFloat = 1.00;
    } 
    this.setState({volume: volFloat});
  }

  handleAlcContentSliderChange(value) {
    let alcFloat = +(value).toFixed(2);
    this.setState({alcContent: alcFloat});
  }

  handleAlcContentFieldChange = (event) => {
    let alcFloat = +(event.target.value)
    if (alcFloat > 100) {
      alcFloat = 100;
    } 
    this.setState({alcContent: alcFloat});
  }
  

  render() {
    const { volume } = this.state;
    const { alcContent } = this.state;
    const units = countUnits(volume, alcContent).toFixed(1);

    return (
      <form className="form-horizontal" action="">
        <div className="form-group">
          <label className="control-label col-sm-3">
            Tilavuus (l):
          </label>
          <div className="col-sm-2">
            <input
              type="number"
              max={1.00}
              step={0.01}      
              name="volume"
              className="form-control input-lg"
              value={volume}
              onChange={this.handleVolumeFieldChange}
            />
          </div>
          <div className="col-sm-6">
            <Slider
              max={1.00}
              step={0.01}
              value={volume}
              onChange={(value) => this.handleVolumeSliderChange(value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">
            Vahvuus (%):
          </label>
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
              onChange={(value) => this.handleAlcContentSliderChange(value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">
            Annokset: 
          </label>
          <div className="col-sm-2">
            <input
              type="hidden"
              name="units"
              value={units}
            />
            <div id="units-text">{units}</div>
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
