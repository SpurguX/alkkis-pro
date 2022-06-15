import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectDiaryTab } from '../actions';
import { diaryTabs } from '../utils/constants';
import { styleTabIfActive } from '../utils/functions';

class DiaryTabs extends Component {

  render() {
    const { selectedTab } = this.props;
    return (
      <div id="diary-tabs-container">
        <button
          className={`btn btn-default col-sm-4 alkkis-tab ${styleTabIfActive(
            diaryTabs.ALL_ENTRIES_TAB,
            selectedTab
          )}`}
          onClick={() => this.props.selectDiaryTab(diaryTabs.ALL_ENTRIES_TAB)}
        >
          Kaikki merkinnät
        </button>
        <button
          className={`btn btn-default col-sm-4 alkkis-tab ${styleTabIfActive(
            diaryTabs.WEEKLY_VIEW_TAB,
            selectedTab
          )}`}
          onClick={() => this.props.selectDiaryTab(diaryTabs.WEEKLY_VIEW_TAB)}
        >
          Viikkonäkymä
        </button>
        <button
          className={`btn btn-default col-sm-4 alkkis-tab ${styleTabIfActive(
            diaryTabs.MONTHLY_VIEW_TAB,
            selectedTab
          )}`}
          onClick={() => this.props.selectDiaryTab(diaryTabs.MONTHLY_VIEW_TAB)}
        >
          Kuukausinäkymä
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedTab: state.diarySelectedTab
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { selectDiaryTab },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryTabs);
