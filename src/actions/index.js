import axios from 'axios';
import firebase from 'firebase';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';
export const POST_BEER = 'POST_BEER';
export const DELETE_BEER = 'DELETE_BEER';

export var hasFetched = false;

var config = {
    apiKey: "AIzaSyD-HLeHtsu17UlatrJZaZQlGHBVdGXXDuk",
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

export function fetchBeers() {
    hasFetched = true;
    var data =  db.collection('Beers').get().then((snapshot) => {
   return snapshot.docs.map((doc) => {
                 return { "id":doc.id,  "data":doc.data()};
            })
        })

    return (dispatch) => {
        hasFetched = true;
 dispatch({
            type: FETCH_BEER,
            payload: data
        })
    

    }
}


export function updateBeer(id, rating) {

   // const request = axios.post(`${url}/updateBeer`, { "id": id, "rating": rating });
   const request = db.collection('Beers').doc(id).update({"rating": rating});
}

export function addNewBeer(data, callback) {
     //axios.post(`${url}/addBeer`, data).then(() => callback());
     const request =  db.collection('Beers').doc().set(data).then(() => callback());

    return {
        type: POST_BEER,
        payload: request
    }
}

export function deleteBeer(id) {
   // axios.post(`${url}/deleteBeer`, { "id": id });

   db.collection('Beers').doc(id).delete();

    return {
        type: DELETE_BEER,
        payload: id
    }
}