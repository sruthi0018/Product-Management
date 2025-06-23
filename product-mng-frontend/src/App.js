import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
// import './theme.css';
import SignupPage from './pages/auth/signup';
import LoginPage from './pages/auth/login';
import HomePage from './pages/layout/Home';
import ProductDetail from './pages/layout/ProductDetail';
import { AuthProvider } from './context/auth';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
