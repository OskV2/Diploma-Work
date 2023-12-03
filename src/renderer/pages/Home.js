import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';

import './Pages.scss'

const HomePage = () => {

  const LinkClasses = 'home__link'

  return (
    <div className='home'>
      <Link className={LinkClasses} to="">I have an ID</Link>
      <Link className={LinkClasses} to="get_id">I need new ID</Link>
      <Link className={LinkClasses} to="disposable">Use chart</Link>
      <Link className={LinkClasses} to="about">About</Link>
    </div>
  );
};

export default HomePage;
