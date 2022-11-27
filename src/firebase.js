import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// })


const firebaseConfig = {
  apiKey: "AIzaSyBp3qsJdPyrOZ3CaOp-LAtUZWZGVvct0qU",
  authDomain: "watodo-1baf8.firebaseapp.com",
  projectId: "watodo-1baf8",
  storageBucket: "watodo-1baf8.appspot.com",
  messagingSenderId: "123413497638",
  appId: "1:123413497638:web:0eaa4084331be0d8ef63e7",
  // Google Analytics:
  // measurementId: "G-88PT41NC4B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)