import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postDrinkList } from '../actions';
import _ from 'lodash';

class AddToDiaryBtn extends Component {

    handleClick() {
        this.props.postDrinkList(this.props.drinkList, this.props.drinkDate);
    }

    renderBtn() {
        if (_.isEmpty(this.props.drinkList)) {
            return <button type="button" className="btn btn-block disabled" tabIndex="-1" >Lisää juomat päiväkirjaan</button>
        } else {
            return <button type="button" className="btn btn-block" onClick={() => this.handleClick()}>Lisää juomat päiväkirjaan</button>
        }
    }

    render() {
        return (
            this.renderBtn()
        )
    }
}

function mapStateToProps(state) {
    return (
        {
            drinkList: state.drinkList,
            drinkDate: state.drinkDate,
        }
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ postDrinkList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToDiaryBtn);