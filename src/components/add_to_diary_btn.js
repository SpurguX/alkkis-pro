import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class AddToDiaryBtn extends Component {

    renderBtn() {
        if (_.isEmpty(this.props.juomalista)) {
            return <button type="button" className="btn btn-block disabled" tabIndex="-1">Lisää juomat päiväkirjaan</button>
        } else {
            return <button type="button" className="btn btn-block">Lisää juomat päiväkirjaan</button>
        }
    }

    render() {
        return(
            this.renderBtn()
        )
    }
       
    
    
}

function mapStateToProps(state) {
    return(
        {
            juomalista : state.juomalista
        }
    )
}

export default connect(mapStateToProps)(AddToDiaryBtn);