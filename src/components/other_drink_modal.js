import React, { Component } from "react";
import ReactDOM from "react-dom";
import OtherDrinkForm from "./other_drink_form";
import SavedDrinks from './saved_drinks';

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

  styleIfActive(tab) {
    if (this.state.selectedTab === tab) {
      return "oth-mod-tab-active";
    }
    return "";
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
            className={`btn btn-default col-sm-6 oth-mod-tab ${this.styleIfActive(addDrinkTab)}`}
            onClick={this.handleAddTabClick}
          >
            Muu juoma - syötä arvot
          </button>
          <button 
            className={`btn btn-default col-sm-6 oth-mod-tab ${this.styleIfActive(savedDrinksTab)}`}
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