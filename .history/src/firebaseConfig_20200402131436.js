const firebaseConfig = {
  apiKey: "AIzaSyB6t4-GFGr0xyjRbVdb1wVPy1IpkyieVpI",
  authDomain: "appx-3172b.firebaseapp.com",
  databaseURL: "https://appx-3172b.firebaseio.com",
  projectId: "appx-3172b",
  storageBucket: "appx-3172b.appspot.com",
  messagingSenderId: "772441202761",
  appId: "1:772441202761:web:c652e081152b3bd8f01f98"
};
import firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const auth = firebase.auth();
export default {db,auth}