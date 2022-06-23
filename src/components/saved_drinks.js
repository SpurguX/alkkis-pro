import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideOthDrinkModal, increaseQuantity, fetchSavedDrinks } from "../actions";
import { getVolumeDisplayValue } from '../utils/functions';
import ReactSelect from 'react-select';

class SavedDrinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selectedDrinks: [],
    }
  }

  componentDidMount() {
    this.props.fetchSavedDrinks().then(async () => {
      try {
        await this.transformSavedDrinksIntoOptions()
      } catch (error) {
        console.log(error)
      }
    });
  }

  transformSavedDrinksIntoOptions(savedDrinks) {
    const options = _.map(this.props.savedDrinks, drink => {
      const { drinkId, drinkName, volume, alcContent } = drink;

      return {
        value: drinkId,
        label: `${drinkName} ${getVolumeDisplayValue(volume)} ${alcContent} %`
      }
    });
    this.setState({ ...this.state, options })
  }

  handleSelection = (selectedDrinks) => {
    this.setState({ ...this.state, selectedDrinks })
    this.styleMultiValuePercentages();
  }


  // TODO Purkkaa - keksi parempi ratkaisu?
  styleMultiValuePercentages = () => {
    this.stylePercentages('react-select__multi-value__label');
  }

  styleOptionPercentages = () => {
    this.stylePercentages('react-select__option');
  }

  stylePercentages (className) {
    const elements = document.getElementsByClassName(className);

    setTimeout(() => {
      for (const el of elements) {
        if (!el.innerHTML.includes('span')) {
          el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1) + '<span class="font-christmas">%</span>'
        }
      }
    }, 0)
  }


  handleAdd = () => {
    for (const option of this.state.selectedDrinks) {
        this.props.increaseQuantity(this.props.savedDrinks[option.value]);
    }
    this.props.hideOthDrinkModal();
  };

  render() {
    return (
      <form className="form-horizontal py-3 px-3">
        <div className="form-group">
          <label className="form-group font-large chalk-underline">
            Valitse yksi tai useampi juoma
          </label>
          <div className="row">
            <div className="col">
              <ReactSelect
                isMulti
                value={this.state.selectedDrinks}
                onChange={this.handleSelection}
                onMenuOpen={this.styleOptionPercentages}
                className="react-select font-large"
                classNamePrefix="react-select"
                options={this.state.options}
                placeholder="Valitse juomia"
                noOptionsMessage={() => "Ei muita valintoja"}
              />
            </div>
          </div>
        </div>
        <div className="form-group mt-4 mb-0">
          <div className="row no-gutters justify-content-between">
            <button
              type="button"
              className="btn btn-lg btn-wood"
              onClick={this.props.hideOthDrinkModal}
            >
              Sulje
            </button>
            <button
              type="button"
              className="btn btn-lg btn-wood"
              onClick={this.handleAdd}
            >
              Lisää juotuihin juomiin
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedDrinks: state.savedDrinks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideOthDrinkModal, increaseQuantity, fetchSavedDrinks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedDrinks);
