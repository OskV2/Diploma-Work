import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import RangeSlider from 'react-range-slider-input';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useDispatch, useSelector } from 'react-redux';

import { chartActions } from '../../store/chart';

import Switch from '../Switch/Switch';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

import './Chart.scss';
import 'react-range-slider-input/dist/style.css';

import ExportIcon from '../../img/file-export.svg';
import Close from '../../img/close.svg';
import Trash from '../../img/trash.svg';

ChartJS.register(...registerables, annotationPlugin);

const Chart = () => {
  const dispatch = useDispatch();

  const file = useSelector((state) => state.input.file);
  const fileData = useSelector((state) => state.input.fileData);
  const rangeMin = useSelector((state) => state.chart.range.min);
  const rangeMax = useSelector((state) => state.chart.range.max);
  const temperature = useSelector((state) => state.chart.temperature);
  const time = useSelector((state) => state.chart.time);
  const annotationPoints = useSelector((state) => state.chart.annotationPoints);
  const lastClickedPoint = useSelector((state) => state.chart.lastClickedPoint);
  const modalIsShown = useSelector((state) => state.chart.modalIsShown);
  const chartRef = useRef(null);

  /* ----------------------------
  *
  *   FUNCTIONS
  *
  ----------------------------- */

  const openModal = () => dispatch(chartActions.openModal());

  const closeModal = () => dispatch(chartActions.closeModal());

  const handleMinInputChange = (e) => dispatch(chartActions.setMinRange(e.target.value));

  const handleMaxInputChange = (e) => dispatch(chartActions.setMaxRange(e.target.value));

  const handleRangeChange = (newRange) => dispatch(chartActions.setRange({ min: newRange[0], max: newRange[1] }));

  const handlePointClick = (event, elements) => {
    if (elements && elements.length > 0) {
      const clickedPoint = fileData[elements[0].index];
      dispatch(chartActions.setLastClickedPoint(clickedPoint));
    
      const clickedPointId = parseInt(clickedPoint.ID) + parseInt(rangeMin);
      const hasAnnotation = annotationPoints.includes(clickedPointId);
  
      if (!hasAnnotation) {
        dispatch(chartActions.addAnnotation(clickedPointId));
      } else {
        dispatch(chartActions.deleteAnnotation(clickedPointId));
      }
    }
  };

  /* ----------------------------
  *
  *   END OF FUNCTIONS
  *
  ------------------------------*/

  const filteredChartData = fileData.slice(
    rangeMin ? parseInt(rangeMin, 10) : 0,
    rangeMax ? parseInt(rangeMax, 10) : fileData.length,
  );

  const filteredLabels = filteredChartData.map((item) => {
    return time ? item.time : item.ID;
  });

  const dataset_0 = {
    label: 'Ch0',
    data: filteredChartData.map((item) => item.Ch0[temperature ? 0 : 1]), // 0 = °C temperature, 1 = K temperature
    borderColor: 'rgb(9, 211, 172)',
    backgroundColor: 'rgba(9, 211, 172, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  };
  const dataset_1 = {
    label: 'Ch1',
    data: filteredChartData.map((item) =>
      item.Ch1 ? item.Ch1[temperature ? 0 : 1] : null,
    ),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  };

  const dataset_2 = {
    label: 'Ch2',
    data: filteredChartData.map((item) =>
      item.Ch2 ? item.Ch2[temperature ? 0 : 1] : null,
    ),
    borderColor: 'rgb(154, 0, 255)',
    backgroundColor: 'rgba(154, 0, 255, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  };

  const dataset_3 = {
    label: 'Ch3',
    data: filteredChartData.map((item) =>
      item.Ch3 ? item.Ch3[temperature ? 0 : 1] : null,
    ),
    borderColor: 'rgb(255, 255, 0)',
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  };

  const datasets = [dataset_0];

  if (fileData.some((item) => 'Ch1' in item)) {
    datasets.push(dataset_1);
  }

  if (fileData.some((item) => 'Ch2' in item)) {
    datasets.push(dataset_2);
  }

  if (fileData.some((item) => 'Ch3' in item)) {
    datasets.push(dataset_3);
  }

  const data = {
    labels: filteredLabels,
    datasets,
  };

  const isAnnotationInRange = (id) => rangeMin <= id && id <= rangeMax;

  const annotations = annotationPoints.map((id, index) => ({
    type: 'line',
    scaleID: 'x',
    value: id - 1 - rangeMin,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 2,
    label: {
      display: true,
      content: `P${index + 1}`,
    },
    diaplay: isAnnotationInRange,
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      annotation: {
        annotations: {
          ...annotations.reduce(
            (obj, _, index) => ({
              ...obj,
              [`line${index + 1}`]: annotations[index],
            }),
            {},
          ),
        },
      },
    },
    scales: {
      x: {
        position: 'bottom',
        title: {
          display: true,
          text: time ? 'Godzina pomiaru w dniu badania' : 'Sekunda badania',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: `Temperatura w ${temperature ? '°C' : 'K'}`,
        },
      },
    },
    maintainAspectRatio: false,
    onClick: handlePointClick,
  };

  const handleExport = () => {
    const base64Image = chartRef.current.toBase64Image('image/png', 1);

    if (base64Image) {
      const anchor = document.createElement('a');
      anchor.href = base64Image;
      anchor.download = 'chart_image.png';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };

  const modalContent = (
    <Modal onClose={closeModal}>
      <h2 className="modal__content__header">Lista adnotacji</h2>
      <img
        className="modal__content__close"
        onClick={closeModal}
        src={Close}
        alt="Close"
      />
      <ul className="modal__content__list">
        {annotationPoints.map((id) => {
          const annotationPoint = fileData.find(
            (point) => parseInt(point.ID) + parseInt(rangeMin) === id,
          );

          return (
            <li className="modal__content__list-item" key={id}>
              {annotationPoint && (
                <>
                  <p>
                    Godzina: {annotationPoint.time}, Sekunda:{' '}
                    {annotationPoint.ID}, Temperatura(Ch0):{' '}
                    {annotationPoint.Ch0[0]} °C / {annotationPoint.Ch0[1]} K{' '}
                  </p>
                  <img
                    className="modal__content__delete"
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

  const settingsContent = (
    <div className="chart__settings">
      <div className="temperature">
        <span className="temperature__text">Ustawienie temperatury</span>
        <Switch
          isOn={temperature}
          handleToggle={() => dispatch(chartActions.setTemperature())}
          id="temperature"
          textOneWhite="°C"
          textOneBlack="°C"
          textTwoWhite="K"
          textTwoBlack="K"
        />
        <Switch
          isOn={time}
          handleToggle={() => dispatch(chartActions.setTime())}
          id="time"
          textOneWhite="czas"
          textOneBlack="czas"
          textTwoWhite="s"
          textTwoBlack="s"
        />
      </div>
      <Button primary={true} onClick={handleExport} className="export">
        <span>Export</span>
        <img src={ExportIcon} alt="Download icon" />
      </Button>
      <Button onClick={openModal}>Lista</Button>
    </div>
  );

  const chartInfo = (
    <>
      <h1 className="chart__title">Wybrany plik: {file ? file.name : 'Brak'}</h1>
      {fileData[1] && (
        <p className="chart__date">
          Data badania: {fileData[1].date.toLocaleDateString()}
        </p>
      )}
      <p className="chart__date">
        Ostatni kliknięty punkt:
        {lastClickedPoint
          ? ` Godzina ${lastClickedPoint.time}, Sekunda badania: ${lastClickedPoint.ID}, Temperatura(Ch0): ${lastClickedPoint.Ch0[0]} °C / ${lastClickedPoint.Ch0[1]} K`
          : ' Brak klikniętego punktu'}
      </p>
    </>
  );

  const chartControls = (
    <>
      <div className="chart__controls">
        <input
          className="chart__input"
          type="number"
          placeholder="min"
          value={rangeMin}
          onChange={handleMinInputChange}
          min="0"
        />
        <input
          className="chart__input"
          type="number"
          placeholder="max"
          value={rangeMax}
          onChange={handleMaxInputChange}
          max={fileData.length}
        />
      </div>
      <RangeSlider
        min={0}
        max={fileData.length}
        value={[rangeMin, rangeMax]}
        onInput={handleRangeChange}
      />
    </>
  );

  return (
    <>
      <div className="chart">
        {modalIsShown && modalContent}
        {settingsContent}
        {chartInfo}
        <div className="chart__container">
          <Line
            data={data}
            options={options}
            width={1000}
            height={500}
            ref={chartRef}
          />
        </div>
        {chartControls}
      </div>
    </>
  );
};

export default Chart;
