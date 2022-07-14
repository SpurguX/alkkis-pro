import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideDeleteEntryModal } from '../actions';

const modalRoot = document.getElementById("modal-root");

class DeleteEntryModal extends Component {
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

  async deleteEntry() {
    try {
      await this.props.deleteFunc()
    } catch (error) {
      this.props.addSnackbar({ text: 'Poistaminen epäonnistui' });
    } finally {
      this.props.hideDeleteEntryModal()
    }
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-content bg-transparent">
        <div className="container-wooden-borders">
          <div className="bg-blackboard header-wrapper d-flex justify-content-center">
            <h4>Haluatko varmasti poistaa merkinnän?</h4>
          </div>
        </div>
        <div className="modal-body bg-blackboard">
          <div className="form-group mt-4 mb-0">
            <div className="row no-gutters justify-content-between">
              <button
                type="button"
                className="btn btn-lg btn-wood"
                onClick={this.props.hideDeleteEntryModal}
              >
                Sulje
              </button>
              <button
                className="btn btn-lg btn-wood"
                onClick={() => this.deleteEntry()}
              >
                Poista merkintä
              </button>
            </div>
          </div>
        </div>
      </div>,
      this.el
    );
  }
}

function mapStateToProps(state) {
  return {
    deleteFunc: state.deleteEntryModal.deleteFunc,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { hideDeleteEntryModal }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEntryModal);
