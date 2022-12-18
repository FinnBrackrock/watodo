import Tree from "../Tree/Tree";
import LoginWindow from "../LoginWindow/LoginWindow";
import SignupWindow from "../SignupWindow/SignupWindow";
import ProtectedRoute from "../Routes/ProtectedRoute";

// import { useNavigate } from 'react-router-dom';

import { auth } from "../..";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";


function App() {
  const [user, setUser] = useState<User|null|undefined>(undefined);
  
  useEffect(() => {
    onAuthStateChanged(auth, userObject => {
      setUser(userObject);
    });
  }, []); 

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute user={user}>
              <Tree user={user}/>
            </ProtectedRoute>
          } />

          <Route path="/login" element={
            <LoginWindow />
          } />

          <Route path="/signup" element={
            <SignupWindow />
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;