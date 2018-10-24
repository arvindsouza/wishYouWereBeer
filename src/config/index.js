import firebase from 'firebase'

export const config = {
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId
}


firebase.initializeApp(config);

export const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
})

export const storage = firebase.storage().ref();