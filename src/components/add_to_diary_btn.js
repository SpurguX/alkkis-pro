import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postDrinkListOk, postDrinkListFailure, emptyDrinkList, showAddResultModal } from '../actions';
import _ from 'lodash';
import axios from 'axios';

class AddToDiaryBtn extends Component {

    postDrinkList(drinkList, date) {
        const drinkListArray = _.map(drinkList, drinkListItem => {
            const entryUnits = drinkListItem.units * drinkListItem.quantity;
            return {
                'drink_date': date._d,
                'drink': {'drinkId': drinkListItem.drinkId},
                'drink_quantity': drinkListItem.quantity,
                'drink_entry_units': entryUnits
            };
        });
            
        axios({
            method: 'post',
            // url: "http://jessetaina.info:8080/add_entry", // TODO add domain to env config
            url: "http://localhost:8080/add_entry",
            data: drinkListArray
        })
        .then((response) => {
            if (response.status === 200) {
                this.props.postDrinkListOk();
                this.props.emptyDrinkList();
            } else {
                this.props.postDrinkListFailure();
            }
        })
        .catch((response) => {
            this.props.postDrinkListFailure();
        })
        .then(() => {
            this.props.showAddResultModal();
        })
    }

    handleClick() {
        this.postDrinkList(this.props.drinkList, this.props.drinkDate);
    }

    renderBtn() {
        if (_.isEmpty(this.props.drinkList)) {
            return <button type="button" className="btn btn-lg btn-wood disabled ml-2 mr-2" tabIndex="-1" >Lisää juomat päiväkirjaan</button>
        } else {
            return <button type="button" className="btn btn-lg btn-wood ml-2 mr-2" onClick={() => this.handleClick()}>Lisää juomat päiväkirjaan</button>
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
    return bindActionCreators({ postDrinkListOk, postDrinkListFailure, emptyDrinkList, showAddResultModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToDiaryBtn);