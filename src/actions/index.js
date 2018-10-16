import axios from 'axios';

export const FETCH_BEER = 'FETCH_BEER';

export function fetchBeers(){

    const request = axios.get('../beers.json');

    return{
        type: FETCH_BEER,
        payload: request
    }
}