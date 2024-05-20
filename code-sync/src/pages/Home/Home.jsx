import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import BarraVertical from '../../common/BarraVertical/BarraVertical';
import ChattingSection from '../../common/ChattingSection/ChattingSection';
import MiddleSection from '../../common/MiddleSection/MiddleSection';
import CommunitySection from '../../common/CommunitySection/CommunitySection';

import './Home.css';

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
    <div className='content-wrapper'>
      <BarraVertical></BarraVertical>
      <ChattingSection></ChattingSection>
      <MiddleSection></MiddleSection>
      <CommunitySection></CommunitySection>
    </div>
  );
};

export default Home;
