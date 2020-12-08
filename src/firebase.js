import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBJ7m7sRzPFU079KBgawAX6dkwncGaIEpo",
  authDomain: "pinterest-clone-c7401.firebaseapp.com",
  projectId: "pinterest-clone-c7401",
  storageBucket: "pinterest-clone-c7401.appspot.com",
  messagingSenderId: "946618085203",
  appId: "1:946618085203:web:c23ef055a2bec52bdffba6",
  measurementId: "G-FY2NS5WPJW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
