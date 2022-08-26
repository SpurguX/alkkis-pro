import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDrinkEntries } from "../actions";
import BlackboardHeader from "./blackboard_header";
import DiaryTableAllEntries from "./diary_table_all_entries";
import DiaryTableDailyView from "./diary_table_daily_view";
import DiaryTableWeekView from "./diary_table_week_view";
import DiaryTableMonthView from "./diary_table_month_view";
import DiaryTabs from "./diary_tabs";
import EditEntryModal from "./edit_entry_modal";
import DeleteEntryModal from "./delete_entry_modal";
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
      case diaryTabs.DAILY_VIEW_TAB:
        return <DiaryTableDailyView entries={this.props.drinkEntries} />;
      case diaryTabs.WEEKLY_VIEW_TAB:
        return <DiaryTableWeekView entries={this.props.drinkEntries} />;
      case diaryTabs.MONTHLY_VIEW_TAB:
        return <DiaryTableMonthView entries={this.props.drinkEntries} />;
      default:
        return <DiaryTableDailyView entries={this.props.drinkEntries} />;
    }
  }

  render() {
    const editEntryModal = this.props.editEntryModal.show ? (
      <EditEntryModal />
    ) : null;
    const deleteEntryModal = this.props.deleteEntryModal.show ? (
      <DeleteEntryModal />
    ) : null;

    return (
      <LoggedInContainer>
        <div className="container container-diary">
          <div className="row pt-4 justify-content-center">
              <BlackboardHeader
                headingTag="h3"
                title="Juomapäiväkirja"
              />
          </div>
          <div className="row pt-4 justify-content-center">
            <div className="col-md-1 hidden-sm" />
              <div className="col-md-10 col-sm-12">
                <DiaryTabs />
                {this.renderDiaryTable()}
              </div>
            <div className="col-md-1 hidden-sm" />
          </div>
        </div>
        {editEntryModal}
        {deleteEntryModal}
      </LoggedInContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    drinkEntries: state.drinkEntriesAll,
    editEntryModal: state.editEntryModal,
    deleteEntryModal: state.deleteEntryModal,
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
