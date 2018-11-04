import { History } from 'history';

export interface IProps {
  addNewBeer: (input: any, inputB: any) => any;
  history: History;
}

export interface IState {
  beers: any;
  fetchBeers: () => void;
}
