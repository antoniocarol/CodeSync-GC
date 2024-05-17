import React from 'react';
import './LoginLogo.css';
import Logo from '../../assets/logoSync.svg';

const LoginLogo = () => {
  return (
    <div className="login-logo">
      <img src={Logo} alt="CodeSync Logo" />
      <h1>CodeSync</h1>
    </div>
  );
};

export default LoginLogo;
