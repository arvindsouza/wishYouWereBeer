import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import promise from 'redux-promise'
import { applyMiddleware, createStore, compose } from 'redux';

import reducers from './reducers';
import './style.scss';
import BeerList from './containers/beerList';
import AddNew from './containers/addNew';

const middleware = [ promise ];
const store = createStore(reducers, compose(applyMiddleware(...middleware)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/new" component={AddNew}/>
        <Route path="/" component={BeerList}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
