import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectDiaryTab } from '../actions';
import { diaryTabs } from '../utils/constants';
import { styleTabIfActive } from '../utils/functions';

class DiaryTabs extends Component {
  getBtnGroupClass () {
    return this.props.screenSize.smallScreen ? 'btn-group-md' : 'btn-group-lg'
  }

  render() {
    const { selectedTab } = this.props;
    return (
      <div className="container-wooden-borders">
        <div className={`btn-group ${this.getBtnGroupClass()} d-flex`} role="group">
          <button
            className={`btn btn-blackboard ${selectedTab !== diaryTabs.ALL_ENTRIES_TAB && 'btn-blackboard--unselected'}`}
            onClick={() => this.props.selectDiaryTab(diaryTabs.ALL_ENTRIES_TAB)}
          >
          Kaikki merkinnät
          </button>
          <button
            className={`btn btn-blackboard ${selectedTab !== diaryTabs.WEEKLY_VIEW_TAB && 'btn-blackboard--unselected'}`}
            onClick={() => this.props.selectDiaryTab(diaryTabs.WEEKLY_VIEW_TAB)}
          >
            Viikkonäkymä
          </button>
          <button
            className={`btn btn-blackboard ${selectedTab !== diaryTabs.MONTHLY_VIEW_TAB && 'btn-blackboard--unselected'}`}
            onClick={() => this.props.selectDiaryTab(diaryTabs.MONTHLY_VIEW_TAB)}
          >
            Kuukausinäkymä
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedTab: state.diarySelectedTab,
    screenSize: state.screenSize
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { selectDiaryTab },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryTabs);
