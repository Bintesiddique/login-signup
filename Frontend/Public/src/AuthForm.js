import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between signup and login
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';

    try {
      const response = await axios.post(url, formData);

      if (response.data.success) {
        if (isLogin) {
          navigate('/home'); // Redirect to home after login
        } else {
          setIsLogin(true); // Switch to login mode after signup
          alert('Signup successful! Please log in.');
        }
      } else {
        alert(response.data.message); // Display error from backend
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-3">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
        )}
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button type="button" className="btn btn-link mt-2" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
