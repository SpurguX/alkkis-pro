import React from 'react';
import Navbar from './navbar';
import Annoslaskuri from './annoslaskuri';

const LoggedInContainer = () => {
    return (
        <div id="main" className="container">
            <Navbar />
            <Annoslaskuri />
        </div>
    )
}

export default LoggedInContainer;