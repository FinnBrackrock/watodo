import "./signup-window.css";
import { useState, useEffect } from "react";

import { auth, db } from "../..";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDoc, doc, collection, updateDoc, setDoc, addDoc, where, query, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignupWindow: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameCheck, setUsernameCheck] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, userObject => {
      if(null !== userObject) navigate('/');
    });
  }, []);


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
       
    const usernameQuery = query(collection(db, 'users'), where('username', '==', testUsername));
    const usernameQueryResponse: QuerySnapshot = await getDocs(usernameQuery);
    let usernameQueryArray: DocumentData[] = [];
    usernameQueryResponse.forEach((doc) => {
      usernameQueryArray.push(doc.data());
    });
    if (usernameQueryArray.length >= 1) {
      return { msg: `Username '${testUsername}' is already taken`, valid: false };
    } else {
        return {
          msg: `Username '${testUsername}' is available`,
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

  const createUserWithUserData = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if(null !== auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: username,
    });
    }
    const userDocId = userCredential.user.uid;
      try {
        await setDoc(doc(db, 'users', userDocId), {
          username: username,
          email: email,
        });
        await addDoc(collection(db, 'users', userDocId, 'nodes'), {
          title: `${username}'s node`,
          text: `hi there my name is ${username}`,
        });
      } catch (err) {
        console.error(err);
      }
  }

  const createAccount = async (e: React.MouseEvent) => {
    e.preventDefault();
    const usernameIsValid = await isValidUsername(username);
    if (email && password.length >= 8 && usernameIsValid.valid) {
      createUserWithUserData();
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginWindow">
        <h1 id="loginText">Sign up</h1>
        <div id="createAccountTextWrapper">
          <h3 id="createAccountText1">Already have an account?</h3>
          <Link to="/login" id="createAccountText2">
            Login
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
