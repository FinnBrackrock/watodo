import "./sign-in-state.css";

import { auth } from "../..";

import { signOut, User } from "firebase/auth";
import { useState } from "react";

const SignInState: React.FC = () => {
  const user = auth.currentUser;

  //if(user?.displayName === null) {
  //  setTimeout(() => window.location.reload(), 500);
  //}

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="signInState">
      {user && (
        <div>
          Signed in as {user.displayName}
          <br />
          <div id="signout" onClick={logOut}>
            Sign out
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInState;
