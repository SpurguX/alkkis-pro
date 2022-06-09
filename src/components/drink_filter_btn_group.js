import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { updateDrinkFilterConditions } from '../actions';
import { MILD, WINE, LIQUEUR, BOOZE} from '../reducers/reducer_drink_filter_conditions';
import _ from 'lodash';

class DrinkFilterBtnGroup extends Component {

    handleClick(types) {
      const conditions = [...this.props.drinkFilterConditions] 
      for (const t of types) {
          const idx = conditions.findIndex(type => type === t)
        if (idx >= 0) {
          conditions.splice(idx, 1)
        } else {
          conditions.push(t)
        }
      }
      this.props.updateDrinkFilterConditions(conditions)
    }

    activeClass(types) {
      console.log('activeClass');
      for (const t of types) {
        const idx = _.indexOf(this.props.drinkFilterConditions, t)
        console.log('idx :>> ', idx);
        if (idx === -1) return ''
      }
      return 'btn-dark'
    }

    render() {
        return (
            <div className="btn-group btn-group-lg" role="group">
              <button type="button" className={`btn btn-light ${this.activeClass([MILD])}`} onClick={() => this.handleClick([MILD])}>Miedot</button>
              <button type="button" className={`btn btn-light ${this.activeClass([WINE])}`} onClick={() => this.handleClick([WINE])}>Viinit</button>
              <button type="button" className={`btn btn-light ${this.activeClass([LIQUEUR, BOOZE])}`} onClick={() => this.handleClick([LIQUEUR, BOOZE])}>Liköörit ja väkevät</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return(
      {
          drinkFilterConditions : state.drinkFilterConditions,
      }
  );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateDrinkFilterConditions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkFilterBtnGroup);