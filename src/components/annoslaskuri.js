import React, { Component } from 'react';
import Juomakuvake from './juomakuvake';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchJuomat } from '../actions';


class Annoslaskuri extends Component {

    componentDidMount() {
       this.props.fetchJuomat();        
    }

    renderKuvakkeet(juomaArray) {
        const returnValue = [];
        for (var i = 0; i < juomaArray.length; i++ ) {
            returnValue.push(this.renderKuvake(i));
        }
        return(
            returnValue
        );
    }

    handleKuvakeClick(juoma) {
        console.log(juoma)
    }

    renderJuomalistaItem(juoma) {
        return <li className="list-group-item">{juoma.juoma_nimi} <span className="badge">1</span></li>
    }

    renderKuvake(juomaInd) {
       
        if (this.props.juomat == null) {
            return <Juomakuvake />;
        } else {
            const juomaObj = this.props.juomat[juomaInd];
            return <Juomakuvake key={juomaObj.juoma_id} id={juomaObj.juoma_id} nimi={juomaObj.juoma_nimi} vahvuus={juomaObj.vahvuus} tilavuus={juomaObj.tilavuus} returnObj={(juoma) => this.handleKuvakeClick(juoma)} />
        }
    }



    render() {
        console.log(this.props.juomat)

        return(
            <div>
                <div className="placeh col-xs-1"></div>
                <div className="col-xs-10" style={{ backgroundColor: 'green'}}>
                    <h2 className="otsikko">Annoslaskuri</h2>
                    <div id="kuvakkeet" className="row">
                            {this.props.juomat != null ? this.renderKuvakkeet(this.props.juomat) : 'Loading...'}
                    </div>
                    <div id="lista_ja_toiminnot">
                        <div id="juomalista" className="col-sm-6">
                                <ul className="list-group">
                                    
                                    <li className="list-group-item">Viinaa <span className="badge">5</span></li>
                                </ul> 
                        </div>
                        <div id="toiminnot" className="col-sm-6">
                            Kalenteri
                            Nappi
                        </div>
                    </div>
                </div>
                <div className="placeh col-xs-1"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        juomat: state.juomat
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchJuomat } , dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Annoslaskuri);

