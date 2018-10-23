import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import promise from 'redux-promise';
import reducers from './reducers';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import BeerList from './containers/beerList';
import AddNew from './containers/addNew';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);


ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>

    <BrowserRouter>
        <div className='Container' >
            <Route render={({ location }) => (
                <TransitionGroup >
                    <CSSTransition
                        timeout={800}
                        classNames='slide'
                        key={location.key}
                    >
                        <Switch location={location}>
                            <Route path='/new' component={AddNew}></Route>
                            <Route path='/' component={BeerList} ></Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />

        </div>

    </BrowserRouter>

</Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
