import React, { Component } from 'react';
import Juomakuvake from './juomakuvake';

export default class Annoslaskuri extends Component {

    render() {
        return(
            <div>
                <div className="placeh col-sm-1"></div>
                <div className="col-sm-10" style={{ backgroundColor: 'brown', height: 1000}}>
                    <h3>Annoslaskuri</h3>
                    <div className="row">
                            <Juomakuvake nimi="Olut III" vahvuus={4.7} tilavuus={0.33} />
                            <Juomakuvake nimi="Olut III" vahvuus={4.7} tilavuus={0.4} />
                            <Juomakuvake nimi="Olut III" vahvuus={4.7} tilavuus={0.5} />
                            <Juomakuvake nimi="Viinilasi" vahvuus={13.5} tilavuus={0.12}/>
                            <Juomakuvake nimi="Viinilasi" vahvuus={13.5} tilavuus={0.16}/>
                            <Juomakuvake nimi="Viinilasi" vahvuus={13.5} tilavuus={0.24}/>
                    </div>
                    <div className="row">
                            <Juomakuvake />
                            <Juomakuvake />
                            <Juomakuvake />
                            <Juomakuvake />
                            <Juomakuvake />
                            <Juomakuvake />
                    </div>
                    <div className="row">
                            <Juomakuvake /> 
                            <Juomakuvake />
                            <Juomakuvake />  
                            <Juomakuvake />
                            <Juomakuvake />
                            <Juomakuvake />

                    </div>
                </div>
                <div className="placeh col-sm-1"></div>
            </div>
        )
    }
}

