import React, { useState, useRef } from 'react';
import Back from '../components/Back/Back';

import Button from '../components/Button/Button';
import './Pages.scss'

const GetId = () => {
  const [randomID, setRandomID] = useState('');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const generateRandomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newRandomID = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newRandomID += characters.charAt(randomIndex);
    }
    setRandomID(newRandomID);
    setInputValue(newRandomID);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  return (
    <>
      <Back />
      <div className='get-id'>
        <h1>Write a new ID or generate a new ID</h1>
        <input type="text" ref={inputRef} value={inputValue} onChange={handleInputChange} maxLength="10"/>
        <div className='get-id__buttons'>
          <Button primary={false} onClick={generateRandomID}>Generate ID number</Button>
          <Button primary={true}>Submit ID</Button>
        </div>
      </div>
    </>
  );
};

export default GetId;
