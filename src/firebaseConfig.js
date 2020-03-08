const firebaseConfig = {
    apiKey: "AIzaSyBcC5dk5ukFGG8HtVAW3A6p-Yat9BLXFNs",
    authDomain: "jaipuria-clubs.firebaseapp.com",
    databaseURL: "https://jaipuria-clubs.firebaseio.com",
    projectId: "jaipuria-clubs",
    storageBucket: "jaipuria-clubs.appspot.com",
    messagingSenderId: "608107382470",
    appId: "1:608107382470:web:60c7b46ce42bf4f89ff9c7"
};
import firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const auth = firebase.auth();
export default {db,auth}