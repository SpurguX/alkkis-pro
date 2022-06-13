import React, { Component } from "react";
import ReactDOM from "react-dom";
import OtherDrinkForm from "./other_drink_form";
import SavedDrinks from './saved_drinks';
import { styleTabIfActive } from '../helpers/functions';

const modalRoot = document.getElementById("modal-root");
const addDrinkTab = 'addDrinkTab';
const savedDrinksTab = 'savedDrinksTab';

export default class OtherDrinkModal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = "modal-container";

    this.state = {selectedTab: addDrinkTab}
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  renderPage() {
    return this.state.selectedTab === addDrinkTab ? <OtherDrinkForm /> : <SavedDrinks />
  }

  handleAddTabClick = () => {
    this.setState({selectedTab: addDrinkTab});
  }

  handleSavedTabClick = () => {
    this.setState({selectedTab: savedDrinksTab});
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-content">
        <div className="modal-header oth-mod-header">
          <button 
            className={`btn btn-default col-sm-6 alkkis-tab ${styleTabIfActive(addDrinkTab, this.state.selectedTab)}`}
            onClick={this.handleAddTabClick}
          >
            Muu juoma - syötä arvot
          </button>
          <button 
            className={`btn btn-default col-sm-6 alkkis-tab ${styleTabIfActive(savedDrinksTab, this.state.selectedTab)}`}
            onClick={this.handleSavedTabClick}
          >
            Tallennetut juomat
          </button>          
        </div>
        <div className="modal-body">
          {this.renderPage()}
        </div>
      </div>,
      this.el
    );
  }
}