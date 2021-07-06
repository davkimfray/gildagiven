import firebase from "firebase";
import app from 'firebase/app';

import "firebase/database";
import 'firebase/storage';
import 'firebase/analytics';

const config = {
    apiKey: "AIzaSyCSNu7IjlsgbTUJS3pyDiz5fkPa2XHABpg",
    authDomain: "gildagiven-ee54d.firebaseapp.com",
    databaseURL: "https://gildagiven-ee54d-default-rtdb.firebaseio.com",
    projectId: "gildagiven-ee54d",
    storageBucket: "gildagiven-ee54d.appspot.com",
    messagingSenderId: "455534660493",
    appId: "1:455534660493:web:aef26ad83e7e99bb994bc4",
    measurementId: "G-6D2X0ZERFJ"
};

let firebaseCache;
let storageCache;
// firebase.analytics();
//
// const database = firebase.firestore();
// const auth = firebase.auth();
//
// export { firebase, database, auth };



export const getFirebase = () => {
    if (firebaseCache) {
        return firebaseCache;
    }
    firebase.initializeApp(config);
    firebaseCache = firebase;
    return firebaseCache;
};
export const getStorage = () => {
    if (storageCache) {
        return storageCache;
    }
    storageCache = firebase.storage();
    return storageCache;
};


//upload image firebase rules
// service firebase.storage {
//     match /b/{bucket}/o {
//     match /{allPaths=**} {
//         allow read, write: if request.auth != null;
//     }
// }
// }


class Firebase {
    constructor() {
        // app.initializeApp(config);

        this.auth = app.auth();
        this.database = firebase.database();
        this.storage = firebase.storage();

    }
    doCreateUserWithEmailAndPassword = (email, password) =>
        console.log({email});
        // this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

}

export default Firebase;
