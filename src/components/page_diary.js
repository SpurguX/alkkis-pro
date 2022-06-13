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
import {
  allEntriesTab,
  weeklyViewTab,
  monthlyViewTab
} from "../reducers/reducer_diary_selected_tab";
import LoggedInContainer from "./logged_in_container";

class Diary extends Component {
  componentDidMount() {
    this.props.fetchDrinkEntries();
  }

  renderDiaryTable() {
    switch (this.props.selectedTab) {
      case allEntriesTab:
        return <DiaryTableAllEntries entries={this.props.drinkEntries} />;
      case weeklyViewTab:
        return <DiaryTableWeekView entries={this.props.drinkEntries} />;
      case monthlyViewTab:
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
        <div id="diary-container">
          <div className="placeh col-sm-1 hidden-xs" />
          <div className="col-sm-10 col-xs-12">
            <h2 className="otsikko">Juomapäiväkirja</h2>
            <DiaryTabs />
            {this.renderDiaryTable()}
          </div>
          <div className="placeh col-sm-1 hidden-xs" />
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
