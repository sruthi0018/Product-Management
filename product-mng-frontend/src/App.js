import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import './theme.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
    
      </Routes>
    </Router>
  );
}

export default App;
