import axios from 'axios';
import firebase from 'firebase';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';
export const POST_BEER = 'POST_BEER';

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

var storage = firebase.storage().ref();

const url = 'http://localhost:3000/beers'

export function fetchBeers(){

    const request = axios.get(url);

    return{
        type: FETCH_BEER,
        payload: request
    }
}

export function updateBeer(id, rating){

    const request = axios.patch(`${url}/${id}`, {"rating": rating});

    return{
        type: UPDATE_BEER,
        payload: request
    }
}

export function addNewBeer(data, file, callback){
    const request = db.collection('Beers').doc().set(data).then(() => callback());

    if (data.img) {
        var refA = storage.child(data.img);
        refA.put(file);
    }


    return {
        type: POST_BEER,
        payload: request
    }
}
