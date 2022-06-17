import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDrinkEntries } from "../actions";
import Navbar from "./navbar";
import DiaryTableAllEntries from "./diary_table_all_entries";
import DiaryTableWeekView from "./diary_table_week_view";
import DiaryTableMonthView from "./diary_table_month_view";
import DiaryTabs from "./diary_tabs";
import EditEntryModal from "./edit_entry_modal";
import { diaryTabs } from '../utils/constants';
import LoggedInContainer from "./logged_in_container";

class Diary extends Component {
  componentDidMount() {
    this.props.fetchDrinkEntries();
  }

  renderDiaryTable() {
    switch (this.props.selectedTab) {
      case diaryTabs.ALL_ENTRIES_TAB:
        return <DiaryTableAllEntries entries={this.props.drinkEntries} />;
      case diaryTabs.WEEKLY_VIEW_TAB:
        return <DiaryTableWeekView entries={this.props.drinkEntries} />;
      case diaryTabs.MONTHLY_VIEW_TAB:
        return <DiaryTableMonthView entries={this.props.drinkEntries} />;
      default:
        return <DiaryTableWeekView entries={this.props.drinkEntries} />;
    }
  }

  render() {
    const editEntryModal = this.props.editEntryModal.show ? (
      <EditEntryModal />
    ) : null;

    return (
      <LoggedInContainer>
        <div className="container container-diary">
          <div className="row pt-4 justify-content-center">
            <div className="container-wooden-borders">
                <div className="header-wrapper">
                  <h3 className="unit-count-header">Juomapäiväkirja</h3>
                </div>
              </div>
          </div>
          <div className="row pt-4 justify-content-center">
            <div className="col-sm-1 hidden-xs" />
            <div className="col-sm-10 col-xs-12">
              <DiaryTabs />
              {this.renderDiaryTable()}
            </div>
            <div className="col-sm-1 hidden-xs" />
          </div>
        </div>
        {editEntryModal}
      </LoggedInContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    drinkEntries: state.allDrinkEntries,
    editEntryModal: state.editEntryModal,
    selectedTab: state.diarySelectedTab
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDrinkEntries }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary);
