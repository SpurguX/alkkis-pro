import React, { Component } from 'react';
import { } from '../actions';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showDeleteEntryModal, addSnackbar, fetchDrinkEntries } from '../actions';

class DeleteEntryBtn extends Component {

    handleClick = (event) => {
      // The user can delete an entry without triggering a confirmation dialog when they do ctrl + click.
      if (!event.ctrlKey) {
        this.props.showDeleteEntryModal(this.deleteEntry.bind(this))
      } else {
        this.deleteEntry()
      }
    }

    deleteEntry = async () => {
      let resultText = 'Merkintä poistettu'
      try {
        const response = await axios({
          method: 'delete',
          // url: `http://jessetaina.info:8080/drinkEntries/${this.props.drink_entry_id}`,
          url: `http://localhost:8080/drinkEntries/${this.props.drink_entry_id}`,
        })

        if (!(response.status === 204)) {
          console.log('response.status :>> ', response.status);
          resultText = 'Merkinnän poistaminen epäonnistui'
        }
      } catch (error) {
        console.log('error :>> ', error);
        resultText = 'Merkinnän poistaminen epäonnistui'
      } finally {
        this.props.fetchDrinkEntries();
        this.props.addSnackbar({ text: resultText });
      }
    }

    render() {
      const btnContent = this.props.screenSize.smallScreen ? <i className="bi bi-trash"></i> : '\u00a0Poista\u00a0'

      return (
          <button className="btn btn-wood btn-wood--compact btn-wood--delete" onClick={this.handleClick}>{btnContent}</button>
      )
    }
}

function mapStateToProps(state) {
  return {
      screenSize: state.screenSize
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showDeleteEntryModal, fetchDrinkEntries, addSnackbar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEntryBtn);
