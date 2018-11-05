import { FETCH_BEER } from '../actions';
import { IAction } from '../interfaces';

export default function(state = {}, action: IAction) {
  switch (action.type) {
    case FETCH_BEER: {
      return action.payload;
    }

    default:
      return state;
  }
}
