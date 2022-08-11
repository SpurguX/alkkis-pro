import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increaseQuantity } from '../actions';
import DrinkIconButtonBase from './drink_icon_button_base'

class DrinkIconButton extends DrinkIconButtonBase { 
    handleClick() {
        this.props.increaseQuantity(this.props)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { increaseQuantity } , dispatch);

}

export default connect(null, mapDispatchToProps)(DrinkIconButton);
