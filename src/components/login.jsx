import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.example.com/login', {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/users'); // Redirige a /ListUsers en caso de login exitoso
      }
    } catch (error) {
      alert('Error al hacer login');
    }
  };

  const handleRegisterClick = () => {
    navigate('/formulario'); // Redirige al formulario de registro
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <button onClick={handleRegisterClick} className="register-button">
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Login;
