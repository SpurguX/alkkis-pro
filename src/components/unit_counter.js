import { Component } from 'react';
import _ from 'lodash';

export default class UnitCounter extends Component {
  componentDidUpdate() {
    this.countUnits(this.props.itemList);
  }

  countUnits(itemList) {
    let units = 0.0;
    if (!_.isEmpty(itemList)) {
      _.forIn(itemList, (item) => {
        units += item.units * item.quantity;
      });
      this.props.setterFn(units)
    } else {
      this.props.setterFn(0)
    }
  }

  render() {
    return null;
  }
}
