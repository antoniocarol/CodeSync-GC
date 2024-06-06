import React, { useState, useRef, useEffect } from 'react';
import Tabs from '../../common/Tabs/Tabs';
import { Stage, Layer, Line, Rect, Text, Image } from 'react-konva';
import useImage from 'use-image';

import './MiddleSection.css';

const MiddleSection = ({ }) => {
 
  
  return (
    <div className='middle-section'>
      <div class="search-container">
        <input type="text" placeholder="Input field with an icon" />
        <div class="icon">&#128269;</div>
      </div>
      <Tabs />
    </div>
  );
};

export default MiddleSection;
