import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import annotationPlugin from 'chartjs-plugin-annotation';
import Switch from '../Switch/Switch';
import Button from '../Button/Button';
import ExportIcon from '../../img/file-export.svg'

import './Chart.scss'

ChartJS.register(...registerables, annotationPlugin);

const Chart = ({ fileData, fileName }) => {  
  const [range, setRange] = useState({ min: 0, max: fileData.length });  
  const [settings, setSettings] = useState({
    temperature: true,  // true = Celsius, false = Kelvin
    time: true,         // true = real time, false = seconds
  })
  const [annotationPointIds, setAnnotationPointIds] = useState([]);
  const [lastClickedPoint, setLastClickedPoint] = useState(null)
  const chartRef = useRef(null);

  const handleMinInputChange = (e) => {
    setRange({ ...range, min: e.target.value });
  };

  const handleMaxInputChange = (e) => {
    setRange({ ...range, max: e.target.value });
  };

  const handleRangeChange = (newRange) => {
    setRange({ min: newRange[0] , max: newRange[1] });
  };

  const filteredChartData = fileData.slice(
    range.min ? parseInt(range.min, 10) : 0,
    range.max ? parseInt(range.max, 10) : fileData.length
  );

  const filteredLabels = filteredChartData.map((item) => {
    return settings.time ? item.time : item.ID
  });

  const dataset_0 = {
    label: 'Ch0',
    data: filteredChartData.map((item) => item.Ch0[ settings.temperature ? 0 : 1 ]), // 0 = °C temperature, 1 = K temperature
    borderColor: 'rgb(9, 211, 172)',
    backgroundColor: 'rgba(9, 211, 172, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  }
  const dataset_1 = {
    label: 'Ch1',
    data: filteredChartData.map((item) => (item.Ch1 ? item.Ch1[settings.temperature ? 0 : 1] : null)),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  };
  
  const dataset_2 = {
    label: 'Ch2',
    data: filteredChartData.map((item) => (item.Ch2 ? item.Ch2[settings.temperature ? 0 : 1] : null)),
    borderColor: 'rgb(154, 0, 255)',
    backgroundColor: 'rgba(154, 0, 255, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  };
  
  const dataset_3 = {
    label: 'Ch3',
    data: filteredChartData.map((item) => (item.Ch3 ? item.Ch3[settings.temperature ? 0 : 1] : null)),
    borderColor: 'rgb(255, 255, 0)',
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  };  

  const datasets = [ dataset_0 ];
  
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

  const handlePointClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedPoint = fileData[elements[0].index];
      const clickedPointId = parseInt(clickedPoint.ID) + parseInt(range.min);

      const hasAnnotation = annotationPointIds.includes(clickedPointId);

      setAnnotationPointIds((prevIds) => {
        if (hasAnnotation) {
          return prevIds.filter((id) => id !== clickedPointId); // Remove the annotation if it already exists
        } else {
          return [...prevIds, clickedPointId]; // Add the annotation if it doesn't exist
        }
      });
      setLastClickedPoint(clickedPoint)
    }
  };

  const isAnnotationInRange = (id) => range.min <= id && id <= range.max;

  const annotations = annotationPointIds
  .map((id, index) => ({
    type: 'line',
    scaleID: 'x',
    value: id - 1 - range.min,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 2,
    label: {
      display: true,
      content: `M${index + 1}`
    },
    diaplay: isAnnotationInRange
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
          ...annotations.reduce((obj, _, index) => ({
            ...obj,
            [`line${index + 1}`]: annotations[index],
          }), {}),
        }
      },
    },
    scales: {
      x: {
        position: 'bottom',
        title: {
          display: true,
          text: settings.time ? 'Godzina pomiaru w dniu badania' : 'Sekunda badania',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: `Temperatura w ${settings.temperature ? '°C' : 'K'}`, 
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

  const settingsContent = (
    <div className='chart__settings'>
      <div className="temperature">
        <span className='temperature__text'>Ustawienie temperatury</span>
        <Switch 
          isOn={settings.temperature}
          handleToggle={() => setSettings(prevSettings => ({ ...prevSettings, temperature: !prevSettings.temperature }))}
          id="temperature"
          textOneWhite="°C"
          textOneBlack="°C"
          textTwoWhite="K"
          textTwoBlack="K"
        />
      </div>
      <div className="time">
        <span className='time__text'>Ustawienie czasu</span>
        <Switch
          isOn={settings.time}
          handleToggle={() => setSettings(prevSettings => ({ ...prevSettings, time: !prevSettings.time }))}
          id="time"
          textOneWhite="czas"
          textOneBlack="czas"
          textTwoWhite="s"
          textTwoBlack="s"
        />
      </div>
      <Button 
        primary={true}
        onClick={handleExport}
        className='export'
      >
        <span>Export</span>
        <img src={ExportIcon} alt="Download icon" />
      </Button>      
    </div>
  )

  const chartInfo = (
    <>
      <h1 className='chart__title'>Wybrany plik: {fileName}</h1>
      {fileData[1] && <p className='chart__date'>Data badania: {fileData[1].date.toLocaleDateString()}</p>}
      <p className='chart__date'>
        Ostatni kliknięty punkt:
        {lastClickedPoint ? (
          ` Godzina ${lastClickedPoint.time}, Sekunda badania: ${lastClickedPoint.ID}, Temperatura(Ch0): ${lastClickedPoint.Ch0[0]} °C / ${lastClickedPoint.Ch0[1]} K`
        ) : (
          ' Brak klikniętego punktu'
        )}
      </p>
    </>
  )

  const chartControls = (
    <>
      <div className="chart__controls">
        <input
          className='chart__input'
          type="number"
          placeholder="min"
          value={range.min}
          onChange={handleMinInputChange}
          min="0"
        />
        <input
          className='chart__input'
          type="number"
          placeholder="max"
          value={range.max}
          onChange={handleMaxInputChange}
          max={fileData.length}
        />
      </div>
      <RangeSlider min={0} max={fileData.length} value={[range.min, range.max]} onInput={handleRangeChange} />
    </>
  )

  return (
    <div className='chart'>
      {settingsContent}
      {chartInfo}
      <div className='chart__container'>
        <Line data={data} options={options} width={1000} height={500} ref={chartRef}/>
      </div>
      {chartControls}
    </div>
  );
};

export default Chart;