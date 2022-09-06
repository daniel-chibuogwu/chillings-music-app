import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// Always install whatever firebase module or api you want to use you want to use
const firebaseConfig = {
  apiKey: "AIzaSyBJATAweqnL46m31gYJVV4wE1_-OqrXo2E",
  authDomain: "music-1c3d8.firebaseapp.com",
  projectId: "music-1c3d8",
  storageBucket: "music-1c3d8.appspot.com",
  appId: "1:800131394338:web:52af371eb3939bb447137b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
  commentsCollection,
};
