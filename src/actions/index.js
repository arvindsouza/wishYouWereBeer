import axios from 'axios';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';

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