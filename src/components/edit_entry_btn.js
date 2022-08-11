import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showEditEntryModal, fetchDrinkEntries } from '../actions';

class EditEntryBtn extends Component {
    render() {
        const btnContent = this.props.screenSize.smallScreen ? <i className="bi bi-pencil"></i> : 'Muokkaa'

        return (
            <button className="btn btn-wood btn-wood--compact" onClick={() => this.props.showEditEntryModal(this.props.entry)}>{btnContent}</button>
        )
    }
}

function mapStateToProps(state) {
    return {
        screenSize: state.screenSize
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showEditEntryModal, fetchDrinkEntries }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryBtn);
