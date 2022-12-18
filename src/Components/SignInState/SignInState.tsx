import "./sign-in-state.css";

import { auth, db } from "../..";

import { signOut, User, onAuthStateChanged } from "firebase/auth";
import { getDoc, updateDoc, doc, onSnapshot, getDocs, Unsubscribe, DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";

const SignInState: React.FC = () => {
  const user = auth.currentUser;

  const [username, setUsername] = useState<string>('');

  //if(user?.displayName === null) {
  //  setTimeout(() => window.location.reload(), 500);
  //}

  useEffect(() => {
    let unsubSnapshot: Unsubscribe | undefined;
    const unsubAuth = onAuthStateChanged(auth, userObject => {
      if(userObject !== null) {
        const docRef = doc(db, 'users', userObject.uid);
        unsubSnapshot = onSnapshot(docRef, (newDoc) => {
          const docData = newDoc.data();
            if(undefined !== docData) {
              setUsername(docData.username);
            }
        });
       }
    });

    return () => {
      unsubAuth();
      if(unsubSnapshot) unsubSnapshot();
    };
  }, []);

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="signInState">
      {/* {user && ( */}
        <div>
          Signed in as {username}
          <br />
          <div id="signout" onClick={logOut}>
            Sign out
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default SignInState;
