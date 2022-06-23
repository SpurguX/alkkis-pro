import React, { useState } from 'react';
import Navbar from './navbar';
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar } from './snackbar';
import * as _ from 'lodash';

const LoggedInContainer = (props) => {
    const snackbars = useSelector((state) => state.snackbars)
    // const snackbars = useSelector((state) => state.snackbars, (left, right) => {
    //     console.log('left :>> ', left);
    //     console.log('right :>> ', right);
    //     if (Object.keys(left)?.length !== Object.keys(right)?.length) return false

    //     return true
    // })
    console.log('snackbars :>> ', snackbars);

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