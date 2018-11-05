import { History } from 'history';
import { FormikValues } from 'formik';

export interface IbeerObject{
  beerName: string,
  desc: string,
  img: string,
  rating: number
}

export interface Idata{
  id: string,
  data: IbeerObject
}

 export interface Iaction{
  type: string,
  payload: any
}

export interface IProps {
  addNewBeer: (beer: FormikValues, img: File) => any
  history: History;
}

export interface IState {
  beers: Idata[];
  fetchBeers: () => void;
}

export interface IRatingsProps {
  beerRating: number;
  beerId: string;
  updateBeer: (id: string, rating: number) => Iaction;
}

export interface Ierrors{
  beerName: string,
  desc: string
}

export interface IreduxState{
  beers: Idata[]
}