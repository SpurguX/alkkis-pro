import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDrinkEntries } from '../actions';
import Navbar from './navbar';
import DiaryTable from './diary_table';
import DiaryTableWeekView from './diary_table_week_view';
import DiaryTabs from './diary_tabs';
import EditEntryModal from './edit_entry_modal';

class Diary extends Component {

    componentDidMount() {
       this.props.fetchDrinkEntries();
    }


    render() {
        const editEntryModal = this.props.editEntryModal.show ? <EditEntryModal /> : null;

        return(
            <div id="main" className="container">
                <Navbar />
                <div id="diary-container">
                    <div className="placeh col-sm-1 hidden-xs"></div>
                    <div className="col-sm-10 col-xs-12">
                        <h2 className="otsikko">Juomapäiväkirja</h2>
                        <DiaryTabs />
                        <DiaryTableWeekView entries={this.props.drinkEntries} />
                    </div>
                    <div className="placeh col-sm-1 hidden-xs"></div>
                </div>
                {editEntryModal}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        drinkEntries: state.allDrinkEntries,
        editEntryModal: state.editEntryModal
    };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ fetchDrinkEntries }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Diary);

