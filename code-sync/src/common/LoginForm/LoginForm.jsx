import React from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className='container-wrapper'>
        <div className="input-container">
          <i className="fas fa-user"></i>
          <input type="email" placeholder="Email" required />
        </div>
        <div className="input-container">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Senha" required />
        </div>
      </div>
      <div className="forgot-password">
          <a href="#">Esqueceu a senha?</a>
        </div>
      <button type="submit" className="login-button">Login</button>
      <button type="button" className="register-button" onClick={goToRegister}>Cadastra-se</button>
    </form>
  );
};

export default LoginForm;
