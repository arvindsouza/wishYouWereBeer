import { FETCH_BEER } from '../actions';
import { Iaction } from '../interfaces'

export default function(state = {}, action: Iaction) {
  switch (action.type) {
    case FETCH_BEER: {
      return action.payload;
    }

    default:
      return state;
  }
}
