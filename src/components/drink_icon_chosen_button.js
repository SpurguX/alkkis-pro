import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DrinkIconButtonBase from "./drink_icon_button_base";
import { decreaseQuantity, increaseQuantity } from "../actions";
import { SWIPE_COMPLETED_THRESHOLD } from '../utils/constants'

class DrinkIconChosenButton extends DrinkIconButtonBase {
  handleTouchEnd () {
    if (
      this.state.touchCoordinates.endingX - this.state.touchCoordinates.startingX >= SWIPE_COMPLETED_THRESHOLD
    ) {
      this.props.increaseQuantity(this.props);
    } else if (
      this.state.touchCoordinates.startingX - this.state.touchCoordinates.endingX >= SWIPE_COMPLETED_THRESHOLD
    ) {
      this.handleDecreaseQuantity()
    }

    this.setState({
      ...this.state,
      interactionState: null
    })
  }

  handleClick(event) {
    if (event.ctrlKey) {
      this.props.increaseQuantity(this.props);
    } else {
      this.handleDecreaseQuantity()
    }
  }

  handleDecreaseQuantity() {
    if (this.props.quantity === 1) {
      this.scheduleToDisappear()
    } else {
      this.props.decreaseQuantity(this.props);
    }
  }

  scheduleToDisappear(delayMs = 110) {
    this.setState({
      ...this.state,
      interactionState: 'about-to-disappear'
    });

    const self = this;
    setTimeout(() => {
      self.props.decreaseQuantity(self.props);
    }, delayMs);
  }
}

function mapStateToProps(state) {
  return {
    drinkList: state.drinkList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ decreaseQuantity, increaseQuantity }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrinkIconChosenButton);
