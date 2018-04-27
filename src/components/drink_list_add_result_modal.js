import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideAddResultModal, postDrinkListClearStatus } from '../actions';
const modalRoot = document.getElementById("modal-root");

class AddResultModal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = "modal-container";
  }

  renderResult()  {
    const addResult = this.props.drinkListPostStatus.ok;
    if (addResult) {
      return "Lisäys onnistui!"
    } else {
      return "Virhe - lisäys ei onnistunut!"
    }
  }

  closeModal() {
    this.props.hideAddResultModal();
    this.props.postDrinkListClearStatus();
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const resultText = this.renderResult()

    return ReactDOM.createPortal(
      <div className="modal-content add-result-modal-content">
        <div className="modal-body">
          <h4>{resultText}</h4>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.closeModal()}
          >
            Sulje
          </button>
        </div>
      </div>,
      this.el
    );
  }
}


function mapStateToProps(state) {
  return(
      {
        drinkListPostStatus: state.drinkListPostStatus
      }
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { hideAddResultModal, postDrinkListClearStatus } , dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(AddResultModal);
