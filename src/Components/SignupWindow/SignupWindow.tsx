import "./signup-window.css";
import { useState, useEffect } from "react";

import { auth, db } from "../..";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import { Link } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignupWindow: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameCheck, setUsernameCheck] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const usermailDocument = doc(db, "usernamesCollection", "userMail");

  const isValidUsername = async (testUsername: string) => {
    if(testUsername === "") {
        return { msg: "Username cannot be empty", valid: false };
    }

    if (testUsername.length <= 3) {
        return {
            msg: "Username must contain at least 3 characters",
            valid: false,
          };
    }

    if (testUsername.length > 16) {
        return {
            msg: "Username cannot contain more than 16 characters",
            valid: false,
          };
    }

    if (false === /.*[a-zA-Z].*/.test(testUsername)) {
        return {
            msg: "Username must contain at least one letter",
            valid: false,
          };
    }

    if (false === /^[A-Za-z0-9_]*$/.test(testUsername)) {
        return {
            msg: "Username can only contain letters, numbers and _",
            valid: false,
          };
    }

    const usermailDoc = await getDoc(usermailDocument);
    const usermailObject = usermailDoc.data();
    if (usermailObject === undefined) {
        return {
            msg: "Could not check username availability, please try again later.",
            valid: false,
          };
    }
       
    const usernamesArray = Object.keys(usermailObject);
    if (usernamesArray.includes(testUsername)) {
      return { msg: "Username is already taken", valid: false };
    } else {
        return {
          msg: `Username ${testUsername} is available`,
          valid: true,
        };
      }
  };

  const usernameInputCheck = async (newUsername: string) => {
    setUsername(newUsername);
    const usernameCheck = await isValidUsername(newUsername);
    setUsernameCheck(usernameCheck.msg);
    setValidUsername(usernameCheck.valid);
  };

  const createAccount = async (e: React.MouseEvent) => {
    e.preventDefault();
    const usernameIsValid = await isValidUsername(username);
    if (email && password.length >= 8 && usernameIsValid.valid) {
      try {
        await updateDoc(usermailDocument, {
          [username]: email,
        });
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          if (auth.currentUser) {
            try {
              await updateProfile(auth.currentUser, {
                displayName: username,
              });
            } catch {
              console.error("Invalid username");
            }
          } else console.error("Setting username failed");
        } catch {
          console.error("Invalid email");
        }
      } catch {
        console.error("Pushing new username to list failed");
      }

      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      console.error("Wrong input");
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginWindow">
        <h1 id="loginText">Sign up</h1>
        <div id="createAccountTextWrapper">
          <h3 id="createAccountText1">Already have an account?</h3>
          <Link to="/login" id="createAccountText2">
            Sign in
          </Link>
        </div>
        <form className="loginForm">
          <div className="inputWrapper">
            <input
              placeholder="Username"
              className="loginInput"
              onChange={(e) => usernameInputCheck(e.target.value)}
              value={username}
            ></input>
          </div>
          {usernameCheck.length >= 1 && (
            <div
              style={{ color: validUsername ? "green" : "red" }}
              className="userNameCheck"
            >
              {usernameCheck}
            </div>
          )}
          <div className="inputWrapper">
            <input
              placeholder="Email adress"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </div>
          <div className="inputWrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
            {showPassword ? (
              <AiOutlineEye
                size={20}
                onClick={() => setShowPassword(false)}
                className="showPasswordToggle"
              />
            ) : (
              <AiOutlineEyeInvisible
                size={20}
                onClick={() => setShowPassword(true)}
                className="showPasswordToggle"
              />
            )}
          </div>
          <button
            type="submit"
            className="loginButton"
            onClick={(e) => createAccount(e)}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupWindow;
