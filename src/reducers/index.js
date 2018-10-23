import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import BeersReducer from './reducer_beers'

const rootReducer = combineReducers({
    beers: BeersReducer,
    form: formReducer
})

export default rootReducer;