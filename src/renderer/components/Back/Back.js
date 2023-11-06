import React from 'react';
import { Link } from 'react-router-dom';

import './Back.scss';
import ChevronLeft from '../../img/chevron-left.svg';

const Pagination = (props) => {
  return (
    <Link className="back__link" to="../">
      <img src={ChevronLeft} alt="Chevron Left" />
      Back
    </Link>
  );
};

export default Pagination;
