'Use strict';

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrinkEntriesToday, setUnitsToday } from '../actions';
import LoggedInContainer from './logged_in_container';
import UnitCountDisplayer from './unit_count_displayer';
import BlackboardHeader from "./blackboard_header";
import TableDrunkToday from './table_drunk_today';
import { calculateTotalUnits } from "../utils/functions";
import _ from "lodash";
import { ROUTE_CALCULATOR } from '../utils/routes';

export default function UnitsToday(props) {
  const dispatch = useDispatch();
  const drinkEntries = useSelector((state) => state.drinkEntriesToday);
  const unitsToday = useSelector((state) => state.unitsToday);
  const [tableComponent, setTableComponent] = useState(null)
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDrinkEntriesToday());
  }, []);

  useEffect(() => {
    const unitsToday = calculateTotalUnits(drinkEntries)
    dispatch(setUnitsToday(unitsToday))
    if (Object.keys(drinkEntries).length) {
      setTableComponent(<TableDrunkToday entries={drinkEntries} />)
    }
  }, [drinkEntries])


  return (
    <LoggedInContainer>
      <div className="container container-units-today">
        <div className="row pt-4 justify-content-center">
          <BlackboardHeader headingTag="h2" title="TäNääN juotu" />
        </div>
        <div className="row pt-4 justify-content-center">
          <div className="col-lg-3 col-md-2 hidden-sm" />
          <div className="col-lg-6 col-md-8 col-sm-12 px-5">
            {tableComponent}
          </div>
          <div className="col-lg-3 col-md-2 hidden-sm" />
        </div>
        <div className="row pt-4 justify-content-center">
          <UnitCountDisplayer units={unitsToday} headingTag="h3" title="ANNOKSIa täNääN:" break={true} />
        </div>
        <div className="row pt-4 justify-content-center">
          <div className="btn btn-wood font-h3" onClick={() => { history.replace(ROUTE_CALCULATOR)} }>Siirry annoslaskuriin</div>
        </div>
      </div>
    </LoggedInContainer>
  );
}
