import { config, storage } from '../config';
import firebase from 'firebase';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';
export const POST_BEER = 'POST_BEER';

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});

export function fetchBeers() {
  const data = db
    .collection('Beers')
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })),
    );

  return {
    type: FETCH_BEER,
    payload: data,
  };
}

export function updateBeer(id: any, rating: number) {
  const request = db
    .collection('Beers')
    .doc(id)
    .update({ rating });

  return {
    type: UPDATE_BEER,
    payload: request,
  };
}

export function addNewBeer(data: any, file: any) {
  const request = db
    .collection('Beers')
    .doc()
    .set(data)
    .then(() => 'Success');

  if (data.img) {
    const refA = storage.child(data.img);
    refA.put(file);
  }

  return {
    type: POST_BEER,
    payload: request,
  };
}
