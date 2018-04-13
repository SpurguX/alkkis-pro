import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import JuomalistaItem from './juomalista_item';

class Juomalista extends Component {

    renderListItems() {
        return _.map(this.props.juomalista, juoma => {
                return (                 
                        <JuomalistaItem key={juoma.juoma_id} 
                        juoma_id={juoma.juoma_id} 
                        juoma_nimi={juoma.juoma_nimi} 
                        tilavuus={juoma.tilavuus} 
                        vahvuus={juoma.vahvuus}
                        quantity={juoma.quantity}
                        />                 
                )         
        })
    }



    render() {
        return (
            <div id="juomalista" className="">      
                { _.isEmpty(this.props.juomalista) ? <p>Lista on tyhjä. Lisää juomia listaan.</p> : <ul className="list-group"> { this.renderListItems()} </ul> }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return(
        {
            juomalista : state.juomalista
        }
    )
}

export default connect(mapStateToProps)(Juomalista);