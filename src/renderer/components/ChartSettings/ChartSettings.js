import { useDispatch, useSelector } from 'react-redux';
import { chartActions } from '../../store/chart';
import { chartSettingsActions } from '../../store/chart-settings';

import Modal from '../Modal/Modal';
import SwitchUI from '../Switch/Switch';

import './ChartSettings.scss'

const ChartSettings = () => {
  const dispatch = useDispatch();

  const temperature = useSelector((state) => state.chart.temperature);
  const time = useSelector((state) => state.chart.time);
  const modalIsShown = useSelector((state) => state.chartSettings.modalIsShown);

  const closeModal = () => dispatch(chartSettingsActions.closeModal());
  const setTemperature = () => dispatch(chartActions.setTemperature())
  const setTime = () => dispatch(chartActions.setTime())

  return (
    <Modal isOpen={modalIsShown} onClose={closeModal} title={'Ustawienia'}>
        <div className='chart__setting'>
            <p>Ustawienie wyświetlanej temperatury [ °C / K ]</p>
            <SwitchUI enabled={temperature} onChange={setTemperature} />
        </div>
        <div className='chart__setting'>
            <p>Ustawienie czasu [ godzina pomiaru / sekunda badania ]</p>
            <SwitchUI enabled={time} onChange={setTime} />
        </div>
    </Modal>
  );
};

export default ChartSettings;
