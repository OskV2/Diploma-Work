import { Link } from 'react-router-dom';

import './Pages.scss'

const HomePage = () => {

  const LinkClasses = 'home__link'

  return (
    <div className='home'>
      <Link className={LinkClasses} to="disposable">Użyj wykresu</Link>
      <Link className={LinkClasses} to="about">O aplikacji</Link>
    </div>
  );
};

export default HomePage;