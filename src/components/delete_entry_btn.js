import React, { Component } from 'react';
import { } from '../actions';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDrinkEntries } from '../actions';

class DeleteEntryBtn extends Component {

    deleteEntry = () => {     
        axios({
          method: 'delete',
          url: `http://jessetaina.info:8080/drinkEntries/${this.props.drink_entry_id}`,
      }).then((response) => { 
        console.log(response);
        this.props.fetchDrinkEntries();
      });
    }

    render() {
        return (
            <button className="btn btn-danger" onClick={this.deleteEntry}>Poista</button>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDrinkEntries }, dispatch)
}

export default connect(null, mapDispatchToProps)(DeleteEntryBtn);