import React, { Component } from "react";
import PropTypes from 'prop-types';

class UnitCountDisplayer extends Component {

  createHeadingContent () {
    let totalUnits = this.props.units.toLocaleString('fi', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

    const unitCount = <span className="unit-count-number">{totalUnits}</span>;
    const headingContent = [this.props.title];
    if (this.props.break) {
      headingContent.push(<br />)
    }
    headingContent.push(unitCount)

    return headingContent
  }

  render() {
    const headingContent = this.createHeadingContent();
    const headingElement = React.createElement(this.props.headingTag, { className: 'unit-count-header'}, headingContent)

    return (
      <div className="container-wooden-borders shadow-block--deep">
        <div className="header-wrapper text-center">
          {headingElement}
        </div>
      </div>
    );
  }
}

UnitCountDisplayer.propTypes = {
  title: PropTypes.string,
  break: PropTypes.bool,
  headingTag: PropTypes.string,
  units: PropTypes.number
}

UnitCountDisplayer.defaultProps = {
  title: 'ANNOKSIa: ',
  break: false,
}

export default UnitCountDisplayer
