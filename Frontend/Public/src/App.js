import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './AuthForm';
import HomePage from './Home'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />       
        <Route path="/login" element={<AuthForm />} />  
        <Route path="/home" element={<HomePage />} />   
      </Routes>
    </Router>
  );
}

export default App;
