import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
