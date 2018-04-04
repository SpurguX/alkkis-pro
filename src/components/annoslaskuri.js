import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import Juomakuvake from './juomakuvake';
import Juomalista from './juomalista';
import { fetchJuomat, getJuomalistaState } from '../actions';


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
            />
      }));
    }

    renderJuomalistaItem(juoma) {
        return <li className="list-group-item">{juoma.juoma_nimi} <span className="badge">1</span></li>
    }

    renderKuvake(juomaInd) {
       
        if (this.props.juomat === {}) {
            return <Juomakuvake />;
        } else {
            const juomaObj = this.props.juomat[juomaInd];
          
        }
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
                    <div id="lista_ja_toiminnot">
                        <Juomalista />
                        <div id="toiminnot" className="col-sm-6">
                            Kalenteri
                            Nappi
                        </div>
                    </div>
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
    return bindActionCreators({ fetchJuomat, getJuomalistaState } , dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Annoslaskuri);

