import React from 'react';
import './ChattingSection.css';
import ChannelRow from '../ChannelRow/ChannelRow';

const ChattingSection = ({ onLogin }) => {

  return (
    <div className='chatting-section'>
      <h1>CodeSync</h1>
      <ChannelRow title="CANAIS DE TEXTO" isAdding isTextChannel />
      <ChannelRow title="MENSAGENS DIRETAS" />
    </div>
  );
};

export default ChattingSection;
