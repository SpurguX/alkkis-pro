import React, { Component } from "react";
import ReactDOM from "react-dom";
import OtherDrinkForm from "./other_drink_form";

const modalRoot = document.getElementById("modal-root");

class OtherDrinkModal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = "modal-container";
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Muu juoma</h4>
        </div>
        <div className="modal-body">
          <h4>Syötä juoman arvot</h4>
          <OtherDrinkForm />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            class="btn btn-default"
            onClick={this.props.onClose}
          >
            Sulje
          </button>
        </div>
      </div>,
      this.el
    );
  }
}

export default OtherDrinkModal;
