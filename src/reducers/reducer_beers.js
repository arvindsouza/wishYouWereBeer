import { FETCH_BEER, UPDATE_BEER } from '../actions';
//import _ from 'lodash';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_BEER: {
            return (action.payload.data);
        }

        case UPDATE_BEER: {
            return (action.payload.data);
        }
        
        default: return state
    }
}