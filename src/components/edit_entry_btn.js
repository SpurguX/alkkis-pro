import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showEditEntryModal, fetchDrinkEntries } from '../actions';

class EditEntryBtn extends Component {
    render() {
        return (
            <button className="btn btn-default" onClick={() => this.props.showEditEntryModal(this.props.entry)}>Muokkaa</button>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  showEditEntryModal, fetchDrinkEntries }, dispatch)
}

export default connect(null, mapDispatchToProps)(EditEntryBtn);