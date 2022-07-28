import React, { useState } from 'react';
import Navbar from './navbar';
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar } from './snackbar';
import _ from 'lodash';

const LoggedInContainer = (props) => {
    const snackbars = useSelector((state) => state.snackbars)

    return (
        <div id="main" className="container-fluid container-bg-img container-bg-img--opaque px-0">
            <div className="bg-overlay"></div>
            <Navbar />
            {props.children}
            {_.map(snackbars, (snackbar) => {
                return <Snackbar
                    text={snackbar.text}
                    key={snackbar.id}
                    id={snackbar.id}
                />
            })}
        </div>
    )
}

export default LoggedInContainer;
