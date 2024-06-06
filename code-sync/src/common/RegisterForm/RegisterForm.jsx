import React from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (

    <form className="register-form" onSubmit={handleSubmit}>
      <div className='container-wrapper'>
        <div className="input-container">
          <i className="fas fa-user"></i>
          <input type="email" placeholder="Email" required />
        </div>
        <div className="input-container">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Senha" required />
        </div>
        <div className="input-container">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Confirmar senha" required />
        </div>
      </div>
      <div className="forgot-password">
          <a href="#">Esqueceu a senha?</a>
        </div>
      <button type="submit" className="login-button" onClick={onRegister}>Cadastra-se</button>
     
    </form>
  );
};

export default RegisterForm;
