import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import DrinkListItem from './drink_list_item';
import { emptyDrinkList } from '../actions';

class DrinkList extends Component {
S
    renderListItems() {
        return _.map(this.props.drinkList, drink => {
                return (                 
                        <DrinkListItem key={drink.drink_id} 
                        drink_id={drink.drink_id} 
                        drink_name={drink.drink_name} 
                        volume={drink.volume} 
                        alc_content={drink.alc_content}
                        quantity={drink.quantity}
                        />                 
                )         
        })
    }

    render() {
        return (
            <div id="juomalista" className="">      
                { _.isEmpty(this.props.drinkList) ? <p>Lista on tyhjä. Lisää juomia listaan.</p> : <ul className="list-group"> { this.renderListItems()} </ul> }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return(
        {
            drinkList : state.drinkList,
            drinkListPostStatus: state.drinkListPostStatus
        }
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ emptyDrinkList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkList);