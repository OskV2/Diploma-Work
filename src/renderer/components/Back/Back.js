import { Link } from 'react-router-dom';

import './Back.scss';
import ChevronLeft from '../../img/chevron-left.svg';

const Pagination = () => {
  return (
    <Link className="back__link" to="../">
      <img src={ChevronLeft} alt="Chevron Left" />
      Wróć
    </Link>
  );
};

export default Pagination;