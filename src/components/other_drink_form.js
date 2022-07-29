import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { countUnits, formatJSDate, isEmptyString } from "../utils/functions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideOthDrinkModal, increaseQuantity } from "../actions";
import axiosApi from '../network/axiosApi';
import qs from "qs";
import { drinkType } from '../utils/constants';
import ReactSelect from 'react-select';

const typeSelectOptions = [
  { value: drinkType.MILD, label: 'MIedot' },
  { value: drinkType.WINE, label: 'VIINIt' },
  { value: drinkType.LIQUEUR, label: 'LIköörIt' },
  { value: drinkType.BOOZE, label: 'Väkevät' },
]

const OtherDrinkForm = (props) => {
  const [drinkName, setDrinkName] = useState('');
  const [volume, setVolume] = useState(0.33);
  const [alcContent, setAlcContent] = useState(4.7);
  const [units, setUnits] = useState(0.0);
  const [type, setType] = useState(typeSelectOptions[0]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const volumeSlider = useRef(null);
  const alcContentSlider = useRef(null);


  const handleDrinkNameChange = event => {
    setDrinkName(event.target.value);
  };

  const handleVolumeSliderInput = event => {
    const value = parseFloat(event.target.value)
    setVolume(value)
  }

  const handleVolumeFieldChange = event => {
    setVolume(event.target.value)
    // const valueIsEmpty = isEmptyString(input.value)
    // const volFloat = valueIsEmpty ? '' : +input.value;
    // console.log('volFloat :>> ', volFloat);
    // if (!valueIsEmpty && volFloat > 1.0) {
    //   console.log('Korkein sallittu tilavuus on 1 l.');
    //   // input.setCustomValidity('Korkein sallittu tilavuus on 1 l.');
    //   // input.reportValidity();
    // } else {
    //   // input.setCustomValidity('');
    // }

    // setVolume(volFloat)
    // updateUnits()
  };

  const handleAlcContentSliderInput = event => {
    const value = parseFloat(event.target.value)
    setAlcContent(value)
  }

  const handleAlcContentFieldChange = event => {
    setAlcContent(event.target.value);
  };

  const handleTypeSelection = option => {
    setType(option)
  }

  const updateUnits = () => {
    let units = 0.0;

    const volFloat = parseFloat(volume);
    const alcContentFloat = parseFloat(alcContent);

    if (
      typeof volFloat === 'number' &&
      typeof alcContentFloat === 'number'
    ) {
      units = countUnits(volume, alcContent);
    }

    setUnits(units)
  }

  const styleBackgroundImage = (slider) => {
    // Use gradient to fill the left side of the slider track based on the value or the position of the slider thumb.
    slider.current.style.backgroundImage = getLinearGradientCSS(slider.current);
  }

  const getLinearGradientCSS = (element) => {
    const ratio = (element.value - element.min) / (element.max - element.min);

    return [
      '-webkit-gradient(',
      'linear, ',
      'left top, ',
      'right top, ',
      'color-stop('+ 0 + ', #c48a2b), ',
      'color-stop(' + ratio + ', #f4ad3b), ',
      'color-stop(' + ratio + ', whitesmoke)',
      ')'
    ].join('');
  }

  useEffect(updateUnits, [volume, alcContent])
  useEffect(() => { styleBackgroundImage(volumeSlider)}, [volume])
  useEffect(() => { styleBackgroundImage(alcContentSlider)}, [alcContent])

  useEffect(() => {
    console.log('errors :>> ', errors);
  }, [errors])

  const addNewDrinkToDbAndList = () => {
    if (drinkName === "") {
      drinkName = "Muu juoma";
    }
    const data = {
      drinkName: drinkName,
      volume: volume,
      alcContent: alcContent,
      units: units,
      type: type.value,
    };

    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: "save_other_drink"
    };

    axiosApi.request(options)
      .then(response => {
        props.increaseQuantity(response.data);
      })
      .catch(response => {
        console.log("Error", response.status);
      });
  }

  const handleAdd = event => {
    console.log('handleAdd');
    event.preventDefault();
    // TODO VALIDATION
    // try {
    //   handleSubmit(() => {
    //     console.log('handleSubmit called!');
    //   })
    // } catch (e) {
    //   console.log('e :>> ', e);
    // }

    addNewDrinkToDbAndList();
    props.hideOthDrinkModal();
  };

  const unitsFormatted = () => units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <form
      className="form-horizontal px-3 py-3"
      onSubmit={handleSubmit((data) => {
        console.log("data", data);
        console.log("errors", errors);
      })}
    >
      <div className="form-group">
        <label className="control-label font-large chalk-underline">Juoman nimi</label>
        <div className="row">
          <div className="col-lg-8 col-sm-10">
            <input
              type="text"
              name="drinkName"
              className="form-control input-lg font-large"
              {...register("drinkName", { required: true })}
              value={drinkName}
              onChange={handleDrinkNameChange}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="control-label font-large chalk-underline">
          Tilavuus <span className="font-christmas">(</span>litraa
          <span className="font-christmas">)</span>
        </label>
        <div className="row">
          <div className="col-lg-2">
            <input
              type="number"
              step={0.01}
              name="volume"
              className="form-control input-lg font-large"
              {...register("volume", { required: true, min: 0, max: 1 })}
              value={volume}
              onChange={handleVolumeFieldChange}
            />
          </div>
          <div className="col-lg-6 d-flex align-items-center">
            <input
              type="range"
              ref={volumeSlider}
              className="alkkis-range"
              step={0.01}
              min={0}
              max={1}
              value={volume}
              onInput={handleVolumeSliderInput}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="control-label font-large chalk-underline">
          Vahvuus <span className="font-christmas">(%)</span>
        </label>
        <div className="row">
          <div className="col-sm-2">
            <input
              type="number"
              step={0.1}
              // name="alc-content"
              className="form-control input-lg font-large"
              value={alcContent}
              onInput={handleAlcContentFieldChange}
              // {...register("alc-content", { required: true, min: 0, max: 100 })}
            />
          </div>
          <div className="col-sm-6 d-flex align-items-center">
            <input
              type="range"
              ref={alcContentSlider}
              className="alkkis-range"
              step={0.1}
              min={0}
              max={100}
              value={alcContent}
              onInput={handleAlcContentSliderInput}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="control-label font-large chalk-underline">
          Luokitus
        </label>
        <div className="row">
          <div className="col-lg-8">
            <ReactSelect
              value={type}
              onChange={handleTypeSelection}
              className="react-select font-large"
              classNamePrefix="react-select"
              options={typeSelectOptions}
            />
          </div>
        </div>
        {/* <select className="form-control" id="exampleFormControlSelect1" onInput={handleTypeSelection}>
          <option value={drinkType.MILD}>MIedot</option>
          <option value={drinkType.WINE}>VIINIt</option>
          <option value={drinkType.LIQUEUR}>LIköörIt</option>
          <option value={drinkType.BOOZE}>Väkevät</option>
        </select> */}
      </div>

      {/* { errors } */}
      <div className="form-group mt-4">
        <div className="row">
          <div className="col font-xlarge">
            <label className="units-text chalk-underline">Annokset: {unitsFormatted()}</label>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <div>
        <input type="submit"></input>
      </div> */}
      <div className="form-group mt-4 mb-0">
        <div className="row no-gutters justify-content-between">
          <button
            type="button"
            className="btn btn-lg btn-wood"
            onClick={props.hideOthDrinkModal}
          >
            Sulje
          </button>
          <button
            className="btn btn-lg btn-wood"
            onClick={handleAdd}
          >
            Tallenna juoma
          </button>
        </div>
      </div>
    </form>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideOthDrinkModal, increaseQuantity }, dispatch);
}

export default connect(null, mapDispatchToProps)(OtherDrinkForm);
