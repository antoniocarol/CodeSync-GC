import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const key = CryptoJS.SHA256('feijao').toString();
    const authKey = document.cookie.split('; ').find(row => row.startsWith('authKey='))?.split('=')[1];

    if (authKey !== key) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
};

export default Home;
