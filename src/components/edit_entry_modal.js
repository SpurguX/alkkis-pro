import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideEditEntryModal } from '../actions';
import EditEntryForm from './edit_entry_form';

const modalRoot = document.getElementById("modal-root");

class EditEntryModal extends Component {
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
          Muokkaa päiväkirjamerkintää
        </div>
        <div className="modal-body">
          <EditEntryForm />
        </div>
      </div>,
      this.el
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { hideEditEntryModal } , dispatch);

}

export default connect(null, mapDispatchToProps)(EditEntryModal);
