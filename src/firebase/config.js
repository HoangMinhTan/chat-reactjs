import firebase from "firebase/app";

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyA-py1Kn2KgoGA8kjgJQdYzl6VwKO_iqv0",
    authDomain: "chat-app-9daca.firebaseapp.com",
    projectId: "chat-app-9daca",
    storageBucket: "chat-app-9daca.appspot.com",
    messagingSenderId: "1055178704460",
    appId: "1:1055178704460:web:0babd7a083ce08583556e9",
    measurementId: "G-D83MRQSD96"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();

  export { db, auth };
  export default firebase;