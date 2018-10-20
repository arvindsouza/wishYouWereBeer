import { FETCH_BEER, UPDATE_BEER, DELETE_BEER } from '../actions';
import _ from 'lodash';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_BEER: {
            console.log(action.payload);
            return _.mapKeys((action.payload), 'id');
        }

        case UPDATE_BEER: {
            return _.mapKeys((action.payload), 'id');
        }

        case DELETE_BEER: {
            return _.omit(state, action);
        }
        
        default: return state
    }
}