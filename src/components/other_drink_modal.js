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

  handleAddTabClick = () => {
    this.setState({selectedTab: addDrinkTab});
  }

  handleSavedTabClick = () => {
    this.setState({selectedTab: savedDrinksTab});
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-content bg-transparent">
        <div className="container-wooden-borders">
          <div className="btn-group btn-group-lg d-flex" role="group">
            <button
                  className={`btn btn-blackboard ${this.state.selectedTab !== addDrinkTab && 'btn-blackboard--unselected'}`}
                  onClick={this.handleAddTabClick}
                >
                  Muu juoma - syötä arvot
                </button>
            <button
              type="button"
              className={`btn btn-blackboard ${this.state.selectedTab !== savedDrinksTab && 'btn-blackboard--unselected'}`}
              onClick={this.handleSavedTabClick}
            >
              Tallennetut juomat
            </button>
          </div>
        </div>
        <div className="modal-body bg-blackboard">
          {this.renderPage()}
        </div>
      </div>,
      this.el
    );
  }
}