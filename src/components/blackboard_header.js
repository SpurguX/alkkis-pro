'Use strict';

import React from "react";
import PropTypes from 'prop-types';

export default function BlackboardHeader(props) {
  const headingElement = React.createElement(props.headingTag, {}, props.title)

  return (
    <div className="container-wooden-borders">
      <div className="header-wrapper">
        {headingElement}
      </div>
    </div>
  );
}

BlackboardHeader.propTypes = {
  title: PropTypes.string,
  headingTag: PropTypes.string,
}
