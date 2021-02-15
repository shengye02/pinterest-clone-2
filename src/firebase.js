import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3yBMMHwQJ1P8CyHyJYTxBQxFTttQlazo",
  authDomain: "pinterest-9d11a.firebaseapp.com",
  projectId: "pinterest-9d11a",
  storageBucket: "pinterest-9d11a.appspot.com",
  messagingSenderId: "502361509838",
  appId: "1:502361509838:web:e4b6bc7a93410d71df259f",
  measurementId: "G-C1DS2S6FRW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
