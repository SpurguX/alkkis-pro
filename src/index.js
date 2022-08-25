import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';
import LoginPage from './components/page_login';
import Diary from './components/page_diary';
import PageUnitCalculator from './components/page_unit_calculator';
import PageUnitsToday from './components/page_drunk_today';
import moment from 'moment';
import localeFi from './moment-locale-fi' // relevant import
import AxiosSetupInterceptors from './network/axiosSetupInterceptors';
import ScreenSizeObserver from './components/screen_size_observer';
import SnackbarRenderer from './components/snackbar_renderer';
import ChangePasswordModalRenderer from './components/change_password_modal_renderer';
import { ROUTE_DRUNK_TODAY, ROUTE_CALCULATOR, ROUTE_DIARY, ROUTE_LOGIN } from './utils/routes';

moment.locale('fi')

const reduxStore = applyMiddleware(promise)(createStore);
export const initializedReduxStore = reduxStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store={initializedReduxStore}>
        <BrowserRouter>
            <Switch>
                <Route path={ROUTE_DRUNK_TODAY} component={PageUnitsToday}/>
                <Route path={ROUTE_CALCULATOR} component={PageUnitCalculator}/>
                <Route path={ROUTE_DIARY} component={Diary}/>
                <Route path={ROUTE_LOGIN} component={LoginPage}/>
            </Switch>
            <AxiosSetupInterceptors />
        </BrowserRouter>
        <ScreenSizeObserver />
        <SnackbarRenderer />
        <ChangePasswordModalRenderer />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
