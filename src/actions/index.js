import firebase from 'firebase';

export const FETCH_BEER = 'FETCH_BEER';
export const UPDATE_BEER = 'UPDATE_BEER';

const config = {
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId
};

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
