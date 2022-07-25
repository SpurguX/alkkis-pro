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
import moment from 'moment';
import localeFi from './moment-locale-fi' // relevant import
import ScreenSizeObserver from './components/screen_size_observer'

moment.locale('fi')

const reduxStore = applyMiddleware(promise)(createStore);
export const initializedReduxStore = reduxStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store={initializedReduxStore}>
        <BrowserRouter>
            <Switch>
                <Route path="/calculator" component={PageUnitCalculator}/>
                <Route path="/diary" component={Diary}/>
                <Route path="/" component={LoginPage}/>
            </Switch>
        </BrowserRouter>
        <ScreenSizeObserver />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
