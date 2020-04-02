const firebaseConfig = {
  apiKey: "AIzaSyCK1fz0nfMsVEmatD5xmuZEBkK7tn24Yf4",
  authDomain: "quizapp-20.firebaseapp.com",
  databaseURL: "https://quizapp-20.firebaseio.com",
  projectId: "quizapp-20",
  storageBucket: "quizapp-20.appspot.com",
  messagingSenderId: "402659683438",
  appId: "1:402659683438:web:ca7dc12d9ee012039cca7f",
  measurementId: "G-B2KF73M8XP"
};
import firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const auth = firebase.auth();
export default {db,auth}