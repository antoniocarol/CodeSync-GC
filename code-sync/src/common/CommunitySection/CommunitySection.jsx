import React from 'react';
import './CommunitySection.css';
import CommunityLogo from '../../assets/communityLogo.svg';
import ChannelRow from '../ChannelRow/ChannelRow';

const CommunitySection = () => {
  const users = [
    { name: 'Nicollas Matsuo', isOnline: true, inCall: false, avatar: null },
    { name: 'Maurício Lopes', isOnline: true, inCall: true, avatar: null },
    { name: 'Letícia Mendes', isOnline: false, inCall: false, avatar: null },
    { name: 'William Zaronni', isOnline: false, inCall: true, avatar: null },
  ];

  return (
    <div className='community-section'>
      <div className='row-community-logo'>
        <img src={CommunityLogo} alt='Community Logo'></img>
        <h2 className='small-space online-text'>- Online</h2>
      </div>
      <div className='scrollBar'>
        <ChannelRow title="DESENVOLVEDORES" isUserDisplayer users={users} />
        <ChannelRow title="MARKETING" isUserDisplayer users={users} />
        <ChannelRow title="VENDAS" isUserDisplayer users={users} />
        <ChannelRow title="VENDAS" isUserDisplayer users={users} />
        <ChannelRow title="VENDAS" isUserDisplayer users={users} />
      </div>
    </div>
  );
};

export default CommunitySection;
