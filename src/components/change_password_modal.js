"Use strict";

import { isThisSecond } from "date-fns";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideChangePasswordModal, addSnackbar } from '../actions';
import axiosApi from '../network/axiosApi';

const modalRoot = document.getElementById("modal-root");

class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = "modal-container";
    this.state = {
      newPassword: ""
    };
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  handlePasswordChange = event => {
    this.state = {
      ...this.state,
      newPassword: event.target.value
    }
  }

  async changePassword() {
    try {
      if (!this.validatePassword()) return;

      await this.requestPasswordChange();
      this.props.hideChangePasswordModal()
      this.props.addSnackbar({ text: 'Tunnussana vaihdettu!' });
    } catch (error) {
      this.props.addSnackbar({ text: 'Tunnussanan vaihtaminen epäonnistui' });
    }
  }

  validatePassword() {
    let valid = true;

    if (this.state.newPassword?.length <= 8) {
      this.props.addSnackbar({ text: 'Syötä vähintään 8 merkkiä' });
      valid = false
    }

    return valid;
  }

  requestPasswordChange() {
    axiosApi({
      method: 'POST',
      data: { password: this.state.newPassword },
      url: 'change_password',
    })
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-content bg-transparent">
        <div className="container-wooden-borders">
          <div className="bg-blackboard header-wrapper d-flex justify-content-center">
            <h4>Uusi tunnussana</h4>
          </div>
        </div>
        <div className="modal-body bg-blackboard">
        <div className="form-group">
          <label className="form-group font-large chalk-underline">
            Syötä vähintään 8 merkkiä.
          </label>
          <div className="row">
            <div className="col">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="TunnussaNa"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
          </div>
        </div>
          <div className="form-group mt-4 mb-0">
            <div className="row no-gutters justify-content-between">
              <button
                type="button"
                className="btn btn-lg btn-wood"
                onClick={this.props.hideChangePasswordModal}
              >
                Sulje
              </button>
              <button
                className="btn btn-lg btn-wood"
                onClick={() => this.changePassword()}
              >
                Tallenna
              </button>
            </div>
          </div>
        </div>
      </div>,
      this.el
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { hideChangePasswordModal, addSnackbar }, dispatch);

}

export default connect(null, mapDispatchToProps)(ChangePasswordModal);
