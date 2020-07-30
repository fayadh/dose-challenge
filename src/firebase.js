import firebase from "firebase";

require("firebase/firestore");

const config = {
  apiKey: "AIzaSyBpxZ8TA9vrt4bADPhBmhSCsiqUjDSTT9Q",
  authDomain: "dose-75c5c.firebaseapp.com",
  databaseURL: "https://dose-75c5c.firebaseio.com",
  projectId: "dose-75c5c",
  storageBucket: "dose-75c5c.appspot.com",
  messagingSenderId: "704522799806",
  appId: "1:704522799806:web:666e615f26e0d4a81eacef",
  measurementId: "G-7DMF3F5FMC",
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const SERVER_TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp();

export default db;
