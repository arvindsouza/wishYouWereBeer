import { db } from '../config';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';

//const url = 'http://localhost:3000/beers';

export function fetchBeers() {
  const data = db
    .collection('Beers')
    .get()
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        return { id: doc.id, data: doc.data() };
      });
    });

  return {
    type: FETCH_BEER,
    payload: data,
  };
}

 export function updateBeer() {
 /* const request = axios.patch(`${url}/${id}`, { "rating": rating });
  
      return {
          type: UPDATE_BEER,
          payload: request
      }*/
}
