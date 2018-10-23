import firebase from 'firebase';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';

const config = {
    authDomain: "wishyouwerebeer-95c98.firebaseapp.com",
    databaseURL: "https://wishyouwerebeer-95c98.firebaseio.com",
    projectId: "wishyouwerebeer-95c98",
    storageBucket: "wishyouwerebeer-95c98.appspot.com",
    messagingSenderId: "106860179355"
}
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
})

const url = 'http://localhost:3000/beers'

export function fetchBeers() {

    var data = db.collection('Beers').get().then((snapshot) => {
        return snapshot.docs.map((doc) => {
            return { "id": doc.id, "data": doc.data() };
        })
    })

    return {
        type: FETCH_BEER,
        payload: data
    }
}

export function updateBeer(id, rating) {

    /*  const request = axios.patch(`${url}/${id}`, { "rating": rating });
  
      return {
          type: UPDATE_BEER,
          payload: request
      }*/
}
