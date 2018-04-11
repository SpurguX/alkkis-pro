import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import Juomakuvake from './juomakuvake';
import Juomalista from './juomalista';
import UnitCounter from './unit_counter';
import DrinkListButtons from './drink_list_buttons';
import { fetchJuomat } from '../actions';


class Annoslaskuri extends Component {

    componentDidMount() {
       this.props.fetchJuomat();
    }

    renderKuvakkeet() {
      return (_.map(this.props.juomat, juoma => {
        return <Juomakuvake key={juoma.juoma_id} 
            juoma_id={juoma.juoma_id} 
            juoma_nimi={juoma.juoma_nimi} 
            tilavuus={juoma.tilavuus} 
            vahvuus={juoma.vahvuus}
            annokset={juoma.annokset}
            />
      }));
    }

    renderJuomalistaItem(juoma) {
        return <li className="list-group-item">{juoma.juoma_nimi} <span className="badge">1</span></li>
    }

    render() {
        return(
            <div id="annoslaskuri-container">
                <div className="placeh col-sm-2 hidden-xs"></div>
                <div className="col-sm-8 col-xs-12">
                    <h2 className="otsikko">Annoslaskuri</h2>
                    <div id="juomakuvakegrid-container" className="row">
                            {this.props.juomat != null ? this.renderKuvakkeet(this.props.juomat) : 'Loading...'}
                            <Juomakuvake juoma_nimi="Muu juoma" />
                    </div>
                    <UnitCounter />
                    <Juomalista />
                    <DrinkListButtons />
                </div>
                <div className="placeh col-sm-2 hidden-xs"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        juomat: state.juomat,
        juomalista: state.juomalista
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchJuomat } , dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Annoslaskuri);

