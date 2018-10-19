import axios from 'axios';
import Firebase from 'firebase';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';
export const POST_BEER = 'POST_BEER';

const url = 'http://localhost:4200/beers'

const fireUpload = new Firebase('https://wishyouwerebeer-2c96c.firebaseio.com/Beers.json');

export function fetchBeers(){

    const request = axios.get(`${url}/showList`);
    return{
        type: FETCH_BEER,
        payload: request
    }
}

export function updateBeer(id, rating){

    const request = axios.post(`${url}/updateBeer`, {"id": id, "rating": rating});

    return{
        type: UPDATE_BEER,
        payload: request
    }
}

export function addNewBeer(data, callback){
    const request = axios.post(`${url}/addBeer`, data).then(() => callback());

    return {
        type: POST_BEER,
        payload: request
    }
}