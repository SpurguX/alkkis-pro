import React, { Component } from 'react';
import { getVolumeDisplayValue } from '../utils/functions';
import { SWIPE_STARTED_THRESHOLD } from '../utils/constants';

class DrinkIconButtonBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touchCoordinates: {
        startingX: null,
        endingX: null,
      },
      interactionState: null,
    };
  }

  handleClick() {
    throw new Error('Must be implemented in the inheriting class.');
  }

  handleTouchStart(event) {
    this.setState({
      ...this.state,
      touchCoordinates: Object.assign(this.state.touchCoordinates, {
        startingX: event.touches[0].screenX,
      }),
    });
  }

  handleTouchMove(event) {
    this.setState({
      ...this.state,
      touchCoordinates: Object.assign(this.state.touchCoordinates, {
        endingX: event.touches[0].screenX,
      }),
    });
    this.setInteractionState();
  }

  handleTouchEnd() {
    // Can optionally be implemented in the inheriting class.
  }

  setInteractionState() {
    let interactionState = null;

    const xDifference =
      this.state.touchCoordinates.endingX -
      this.state.touchCoordinates.startingX;

    if (xDifference > SWIPE_STARTED_THRESHOLD) {
      interactionState = 'swiped-right';
    } else if (-xDifference > SWIPE_STARTED_THRESHOLD) {
      interactionState = 'swiped-left';
    }

    this.setState({
      ...this.state,
      interactionState: interactionState,
    });
  }

  render() {
    const alcContent = this.props.alcContent.toLocaleString('fi');

    let iconName;
    this.props.icon !== null
      ? (iconName = this.props.icon)
      : (iconName = 'tall-glass.svg');
    const icon = require(`../images/${iconName}`);

    return (
      <div
        className="drink-icon-button-container"
        data-interaction-state={this.state.interactionState}
        onClick={(event) => this.handleClick(event)}
        onTouchStart={(event) => this.handleTouchStart(event)}
        onTouchMove={(event) => this.handleTouchMove(event)}
        onTouchEnd={(event) => this.handleTouchEnd(event)}
      >
        <div className="drink-icon-button">
          <img src={icon} alt="img" className="drink-icon" />
          <p className="mb-0">{this.props.drinkName}</p>
          <p className="mt-0 mb-0">
            {alcContent} %, {getVolumeDisplayValue(this.props.volume)}
          </p>
          {this.props.quantity && (
            <div className="drink-icon-button-badge drink-icon-button-badge--quantity">
              {this.props.quantity}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DrinkIconButtonBase;
