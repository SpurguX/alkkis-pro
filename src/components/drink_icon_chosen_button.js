import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DrinkIconButtonBase from './drink_icon_button_base'
import { decreaseQuantity } from '../actions';

class DrinkIconChosenButton extends DrinkIconButtonBase {
    handleClick() {
        this.props.decreaseQuantity(this.props)
    }
}


function mapStateToProps(state) {
  return(
      {
          drinkList : state.drinkList,
      }
  );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { decreaseQuantity } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkIconChosenButton);