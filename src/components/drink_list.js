import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import DrinkListItem from './drink_list_item';
import { emptyDrinkList } from '../actions';

class DrinkList extends Component {
    renderListItems() {
        return _.map(this.props.drinkList, drink => {
                return (                 
                        <DrinkListItem key={drink.drinkId} 
                        drinkId={drink.drinkId} 
                        drinkName={drink.drinkName} 
                        volume={drink.volume} 
                        alcContent={drink.alcContent}
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