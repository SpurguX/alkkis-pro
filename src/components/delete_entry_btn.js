import React, { Component } from 'react';
import { } from '../actions';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSnackbar, fetchDrinkEntries } from '../actions';

class DeleteEntryBtn extends Component {

    handleClick = (event) => {
      // The user can delete an entry without triggering a confirmation dialog when they do ctrl + click.
      if (!event.ctrlKey) {
        // TODO shoWEditEntryModal
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
        return (
            <button className="btn btn-wood btn-wood--compact btn-wood--delete" onClick={this.handleClick}>&nbsp;Poista&nbsp;</button>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDrinkEntries, addSnackbar }, dispatch)
}

export default connect(null, mapDispatchToProps)(DeleteEntryBtn);