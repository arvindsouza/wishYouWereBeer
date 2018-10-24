import axios from 'axios';
import { db, storage } from '../config';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';
export const POST_BEER = 'POST_BEER';

const url = 'http://localhost:3000/beers';

export function fetchBeers() {
  const request = axios.get(url);

  return {
    type: FETCH_BEER,
    payload: request,
  };
}

export function updateBeer(id, rating) {
  const request = axios.patch(`${url}/${id}`, { rating: rating });

  return {
    type: UPDATE_BEER,
    payload: request,
  };
}

export function addNewBeer(data, file, callback) {
  const request = db
    .collection('Beers')
    .doc()
    .set(data)
    .then(() => callback());

  if (data.img) {
    var refA = storage.child(data.img);
    refA.put(file);
  }

  return {
    type: POST_BEER,
    payload: request,
  };
}
