import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OtherDrinkForm from "./other_drink_form";
import { hideOthDrinkModal } from '../actions';

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
          <h4 className="modal-title">Muu juoma - syötä arvot</h4>
        </div>
        <div className="modal-body">
          <OtherDrinkForm />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.hideOthDrinkModal}
          >
            Sulje
          </button>
        </div>
      </div>,
      this.el
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { hideOthDrinkModal } , dispatch);

}

export default connect(null, mapDispatchToProps)(OtherDrinkModal);
