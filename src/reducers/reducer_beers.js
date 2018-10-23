import { FETCH_BEER, UPDATE_BEER } from '../actions';
import _ from 'lodash';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_BEER: {
            return _.mapKeys(action.payload, 'id')
        }

      /*  case UPDATE_BEER: {
            return _.mapKeys(action.payload.data, 'id')
        }*/

        
        default: return state
    }
}