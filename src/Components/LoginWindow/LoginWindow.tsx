import "./login-window.css";
import { useState, useEffect } from "react";

import { auth, db } from "../..";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, query, collection, where, getDocs, DocumentData } from "firebase/firestore";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginWindow = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const usermailDocument = doc(db, "usernamesCollection", "userMail");

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, userObject => {
      if(null !== userObject) navigate('/');
    });
    // Unsubscribe?
  }, []);

  const signIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (login && password) {
      if (login.includes("@")) {
        try {
          await signInWithEmailAndPassword(auth, login, password);
          setLogin("");
          setPassword("");
        } catch {
          console.error("Wrong email or password");
        }
      } else {
        const usernameQuery = query(collection(db, 'users'), where('username', '==', login));
        const usernameQueryResponse = await getDocs(usernameQuery);
        let usernameQueryArray: DocumentData[] = [];
        usernameQueryResponse.forEach((doc) => {
          usernameQueryArray.push(doc.data());
        });
        if (usernameQueryArray.length >= 1) {
          try {
            await signInWithEmailAndPassword(auth, usernameQueryArray[0].email, password);
            setLogin("");
            setPassword("");
          } catch {
            console.error("Wrong username or password");
          }
        } else console.error("Wrong username or password");
      }
    } else {
      console.error("Wrong input");
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginWindow">
        <h1 id="loginText">Login</h1>
        <div id="createAccountTextWrapper">
          <h3 id="createAccountText1">New User?</h3>
          <Link to="/signup" id="createAccountText2">
            Create an account
          </Link>
        </div>
        <form className="loginForm">
          <div className="inputWrapper">
            <input
              autoComplete="on"
              placeholder="Username or email address"
              className="loginInput"
              onChange={(e) => setLogin(e.target.value)}
              value={login}
            ></input>
          </div>
          <div className="inputWrapper">
            <input
              autoComplete="on"
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
            onClick={(e) => signIn(e)}
          >
            Sign In
          </button>
        </form>
        <a
          href=""
          onClick={(e) => {e.preventDefault();alert('Pech gehabt!');}}
          style={{ color: "white", marginTop: "10px" }}
        >
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginWindow;
