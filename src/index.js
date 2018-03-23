import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';
import LoggedInContainer from './components/logged_in_container';
import Kirjautumissivu from './components/kirjautumissivu';

const reduxStore = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={reduxStore(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/in" component={LoggedInContainer}/>
                <Route path="/" component={Kirjautumissivu}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
