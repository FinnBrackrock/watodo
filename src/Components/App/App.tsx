import View from "../View/View";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>

          <Route path="/" element={
            <View signin={false} signup={false} />
          } />

          <Route path="/login" element={
            <View signin={true} signup={false}/>
          } />

          <Route path="/signup" element={
            <View signin={true} signup={true}/>
          } />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;