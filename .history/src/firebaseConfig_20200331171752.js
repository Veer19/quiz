const firebaseConfig = {
    apiKey: "AIzaSyAPii4J-OK_Ia1ZtM7FsCq9Lm33LT6pdQw",
    authDomain: "social-impact-fc0b3.firebaseapp.com",
    databaseURL: "https://social-impact-fc0b3.firebaseio.com",
    projectId: "social-impact-fc0b3",
    storageBucket: "social-impact-fc0b3.appspot.com",
    messagingSenderId: "822924673601",
    appId: "1:822924673601:web:db6c46c218121b730dfcc0",
    measurementId: "G-00EZR1TH8L"
  };
import firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const auth = firebase.auth();
export default {db,auth}