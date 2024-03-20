import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { chartActions } from '../../store/chart';
import { chartListActions } from '../../store/chart-list';

import Trash from '../../img/trash.svg';
import './chartList.scss'

const ChartList = () => {
  const dispatch = useDispatch();

  const fileData = useSelector((state) => state.input.fileData);
  const rangeMin = useSelector((state) => state.chart.range.min);
  const annotationPoints = useSelector((state) => state.chart.annotationPoints);
  const modalIsShown = useSelector((state) => state.chartList.modalIsShown);

  const deleteAnnotation = (id) => dispatch(chartActions.deleteAnnotation(id));
  const closeModal = () => dispatch(chartListActions.closeModal());

  return (
    <Modal 
      isOpen={modalIsShown} 
      onClose={closeModal}
      title={'Lista adnotacji'}
    >
      <ul className="modal__list">
        {annotationPoints.map((id) => {
          const annotationPoint = fileData.find(
            (point) => parseInt(point.ID) + parseInt(rangeMin) === id,
          );

          return (
            <li className="modal__list-item" key={id}>
              {annotationPoint && (
                <>
                  <p>
                    Godzina: {annotationPoint.time}, 
                    Sekunda:{' '} {annotationPoint.ID}, 
                    Temperatura(Ch0):{' '} {annotationPoint.Ch0[0]} °C / {annotationPoint.Ch0[1]} K{' '}
                  </p>
                  <img
                    className="modal__delete"
                    onClick={() => deleteAnnotation(id)}
                    src={Trash}
                    alt="Delete annotation icon"
                  />
                </>
              )}
            </li>
          );
        })}
        {annotationPoints.length === 0 && <p>Brak adnotacji do wyświetlenia</p>}
      </ul>
    </Modal>
  );
};

export default ChartList;
