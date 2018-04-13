import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

class UnitCounter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            units: 0.0
        }
    }

componentWillReceiveProps(nextProps) {
    this.countUnits(nextProps);
}

countUnits(nextProps) {
    let units = 0.0;
    if (!_.isEmpty(nextProps.juomalista)) {
        _.forIn(nextProps.juomalista, juoma => {
            units += juoma.annokset * juoma.quantity;
            this.setState({ units: units })
            
        })
    } else {
        this.setState({ units: 0.0 })
    }
}

renderUnits() {
    return this.state.units.toFixed(1)
}

render() {
        return(
            <div id="unit-counter-container">
                <h4>Annoksia listassa: {this.renderUnits()}</h4>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        juomalista: state.juomalista,
    };
}

export default connect(mapStateToProps, null)(UnitCounter);

