import { FETCH_BEER } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BEER: {
      return action.payload;
    }

    default:
      return state;
  }
}
