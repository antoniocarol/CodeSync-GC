import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/LoginPage';
import Home from './pages/Home/Home';
import Faq from './pages/Faq/Faq';
import Config from './pages/Config/Config';
import Register from './pages/Register/RegisterPage'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/config" element={<Config />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
