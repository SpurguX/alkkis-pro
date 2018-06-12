import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectDiaryTab } from '../actions';
import { allEntriesTab, weeklyViewTab, monthlyViewTab } from '../reducers/reducer_diary_selected_tab';
import { styleTabIfActive } from '../helpers/functions';

class DiaryTabs extends Component {

  render() {
    const { selectedTab } = this.props;
    return (
      <div id="diary-tabs-container">
        <button className={`btn btn-default col-sm-4 alkkis-tab ${styleTabIfActive(allEntriesTab, selectedTab)}`} onClick={() => this.props.selectDiaryTab(allEntriesTab)}>
          Kaikki merkinnät
        </button>
        <button className={`btn btn-default col-sm-4 alkkis-tab ${styleTabIfActive(weeklyViewTab, selectedTab)}`} onClick={() => this.props.selectDiaryTab(weeklyViewTab)}>
          Viikkonäkymä
        </button>
        <button className={`btn btn-default col-sm-4 alkkis-tab ${styleTabIfActive(monthlyViewTab, selectedTab)}`} onClick={() => this.props.selectDiaryTab(monthlyViewTab)}>
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
