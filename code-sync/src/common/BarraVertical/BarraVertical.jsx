import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoSyncMini from '../../assets/logoSyncMini.svg';
import OnlineUser from '../../assets/onlineUser.svg';
import FaqLogo from '../../assets/faqLogo.svg';
import ConfigLogo from '../../assets/configLogo.svg';
import ExitButton from '../../assets/exitButton.svg';
import './BarraVertical.css';

const BarraVertical = ({ onLogin }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };
  const goToFaq = () => {
    navigate('/faq');
  };
  const goToConfig = () => {
    navigate('/config');
  };
  const signOut = () => {
    document.cookie = 'authKey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };
  
  return (
    <div className='vertical-header'>
      <img src={LogoSyncMini} className='logo-sync'></img>
      <div className='container-wrapper'>
        <img src={OnlineUser} onClick={goToProfile}></img>
        <img src={FaqLogo} onClick={goToFaq}></img>
        <img src={ConfigLogo} onClick={goToConfig}></img>
        <img onClick={signOut} src={ExitButton} id='exitButton'></img>
      </div>
    </div>
  );
};

export default BarraVertical;
