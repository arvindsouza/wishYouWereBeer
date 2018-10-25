import axios from 'axios';
import { config, storage } from '../config';
import firebase from 'firebase';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';
export const POST_BEER = 'POST_BEER';

const url = 'http://localhost:3000/beers';

export const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});

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

export function addNewBeer(data, file) {
  const request = db
    .collection('Beers')
    .doc()
    .set(data)
    .then(() => {
      return new Promise((resolve) => {
        return resolve('Success');
      });
    });

  if (data.img) {
    var refA = storage.child(data.img);
    refA.put(file);
  }

  return {
    type: POST_BEER,
    payload: request,
  };
}
