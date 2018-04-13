import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { populateDrinkListBu, emptyDrinkList, populateDrinkList, emptyDrinkListBu  } from '../actions';

class EmptyDrinkListBtn extends Component {

    handleEmpty() {
        this.props.populateDrinkListBu(this.props.drinkList, this.props.emptyDrinkList())      
    }

    handleRecovery() {
        this.props.populateDrinkList(this.props.drinkListBu, this.props.emptyDrinkListBu())
    }

    renderBtn() {
        if (_.isEmpty(this.props.drinkList)) {
            if(_.isEmpty(this.props.drinkListBu)) {
                return <button type="button" className="btn btn-block disabled" tabIndex="-1">Tyhjennä lista</button>
            } else {
                return <button type="button" className="btn btn-block" onClick={() => this.handleRecovery()}>Palauta lista</button>
            }
        } else {
            return <button type="button" className="btn btn-block" onClick={() => this.handleEmpty()}>Tyhjennä lista</button>
        }
    }

    render() {
        return(
            this.renderBtn()
        );
    } 
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { emptyDrinkList, populateDrinkListBu, populateDrinkList, emptyDrinkListBu }, dispatch);
}

function mapStateToProps(state) {
    return(
        {
            drinkList : state.drinkList,
            drinkListBu : state.drinkListBu
        }
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EmptyDrinkListBtn);