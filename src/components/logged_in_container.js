import React from 'react';
import Navbar from './navbar';
import UnitCalculator from './page_unit_calculator';

const LoggedInContainer = () => {
    return (
        <div id="main" className="container">
            <Navbar />
            <UnitCalculator />
        </div>
    )
}

export default LoggedInContainer;