import Tree from "../Tree/Tree";
import LoginWindow from "../LoginWindow/LoginWindow";
import SignupWindow from "../SignupWindow/SignupWindow";
import ProtectedRoute from "../Routes/ProtectedRoute";

// import { useNavigate } from 'react-router-dom';

import { auth } from "../..";

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    })
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute user={user}>
              <Tree/>
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