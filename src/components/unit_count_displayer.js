import React, { Component } from 'react';
import { connect } from 'react-redux';
import UnitCounter from './unit_counter';

class UnitCountDisplayer extends Component {

renderUnits() {
    return this.props.unitsInList.toFixed(1)
}

render() {
        return(    
            <div id="unit-counter-container">
                <h4>Annoksia listassa: {this.renderUnits()}</h4>
                <UnitCounter />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        unitsInList: state.unitsInList
    };
}

export default connect(mapStateToProps, null)(UnitCountDisplayer);

