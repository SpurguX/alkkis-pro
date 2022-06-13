import React from 'react';
import Navbar from './navbar';
import UnitCalculator from './page_unit_calculator';

const LoggedInContainer = (props) => {
    return (
        <div id="main" className="container-fluid container-bg-img container-bg-img--opaque px-0">
            <div class="bg-overlay"></div>
            <Navbar />
            {props.children}
        </div>
    )
}

export default LoggedInContainer;