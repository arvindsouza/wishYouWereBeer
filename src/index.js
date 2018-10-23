import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import promise from 'redux-promise';
import reducers from './reducers';
import { applyMiddleware, createStore } from 'redux';

import BeerList from './containers/beerList';
import AddNew from './containers/addNew';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <Switch>
            <Route path='/new' component={ AddNew }></Route>
            <Route path = '/' component = { BeerList } ></Route>
        </Switch>
    </BrowserRouter>
    </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
