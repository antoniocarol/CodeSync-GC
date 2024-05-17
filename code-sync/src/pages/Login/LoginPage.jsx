import React, { useEffect } from 'react';
import LoginLogo from '../../common/LoginLogo/LoginLogo';
import LoginForm from '../../common/LoginForm/LoginForm';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const key = CryptoJS.SHA256('feijao').toString();
    const authKey = document.cookie.split('; ').find(row => row.startsWith('authKey='))?.split('=')[1];

    if (authKey === key) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = () => {
    const key = CryptoJS.SHA256('feijao').toString();
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);
    document.cookie = `authKey=${key}; expires=${expires.toUTCString()}; path=/`;
    navigate('/home');
  };

  return (
    <div className="login-page">
      <LoginLogo />
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
