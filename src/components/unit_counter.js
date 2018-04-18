import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { countUnitsInList } from '../actions';
import _ from 'lodash';

class UnitCounter extends Component {

componentDidUpdate(prevProps) {
        this.countUnits(this.props.drinkList);   
}

countUnits(drinkList) {
    let units = 0.0;
    if (!_.isEmpty(drinkList)) {
        _.forIn(drinkList, drink => {
            units += drink.units * drink.quantity;
            this.props.countUnitsInList(units);
        })
    } else {
        this.props.countUnitsInList(0);
    }
}

renderUnits() {
    return this.props.unitsInList.toFixed(1)
}

render() {
      return null;
    }
}

function mapStateToProps(state) {
    return {
        drinkList: state.drinkList,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ countUnitsInList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitCounter);

