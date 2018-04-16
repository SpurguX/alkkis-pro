import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './navbar';
import DiaryTable from './diary_table';
import { fetchDrinkEntries } from '../actions';

class Diary extends Component {

    componentDidMount() {
       this.props.fetchDrinkEntries();
    }

    render() {
        return(
            <div id="main" className="container">
                <Navbar />
                <div id="diary-container" className="alkkis-container">
                    <div className="placeh col-sm-1 hidden-xs"></div>
                    <div className="col-sm-10 col-xs-12">
                        <h2 className="otsikko">Juomapäiväkirja</h2>
                        <DiaryTable />
                    </div>
                    <div className="placeh col-sm-1 hidden-xs"></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        drinks: state.drinks,
        drinkList: state.drinkList
    };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ fetchDrinkEntries }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Diary);

