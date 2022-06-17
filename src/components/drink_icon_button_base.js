import React, { Component } from 'react';
import { getVolumeDisplayValue } from '../utils/functions';

class DrinkIconButtonBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutToDisappear: false
        }

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        throw new Error('Must be implemented in the inheriting class.');
    }

    volumeDisplayValue() {
        return this.props.volume > 0.24
          ? `${this.props.volume.toLocaleString('fi')} l`
          : `${this.props.volume * 100} cl`;
     }

    render() {
        const alcContent = this.props.alcContent.toLocaleString('fi');

        let iconName;
        this.props.icon !== null ? iconName = this.props.icon : iconName = 'tall-glass.svg';
        const icon = require(`../images/${iconName}`);
  
        return (
            <div className={`drink-icon-button-container ${this.state.aboutToDisappear ? 'drink-icon-button-container--disappearing' : ''}`} onClick={this.handleClick} >
                <div className="drink-icon-button">
                    <img src={icon} alt="img" className="drink-icon"/>
                    {/* <svg src={icon} alt="img" className="drink-icon"/> */}
                    {/* <p className="mb-0">{this.props.drinkName} <span className="drink-icon-button-volume-text">{this.volumeDisplayValue()}</span></p> */}
                    <p className="mb-0">{this.props.drinkName}</p>
                    <p className="mt-0 mb-0">{alcContent} %, {getVolumeDisplayValue(this.props.volume)}</p>
                    {/* <div className="drink-icon-button-badge drink-icon-button-badge--alcohol">{alcContent}&#8202;%</div> */}
                    {this.props.quantity && <div className="drink-icon-button-badge drink-icon-button-badge--quantity">{this.props.quantity}</div>}
                </div>
            </div>
        )
    }
}

export default DrinkIconButtonBase