import React, { useEffect } from 'react';
import LoginLogo from '../../common/LoginLogo/LoginLogo';
import RegisterForm from '../../common/RegisterForm/RegisterForm';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

   
  const handleRegister = () => {
    navigate('/login');
  };

  return (
    <div className="register-page">
      <LoginLogo />
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
