import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import './Chart.scss'

ChartJS.register(...registerables);

const Chart = ({ fileData, fileName }) => {  
  const [range, setRange] = useState({ min: 0, max: fileData.length });  

  console.log('Range: ' + range.max)
  console.log('filedata: ' + fileData.length)

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
    return item.time
  });

  const dataset_0 = {
    label: 'Ch0',
    data: filteredChartData.map((item) => item.Ch0),
    borderColor: 'rgb(9, 211, 172)',
    backgroundColor: 'rgba(9, 211, 172, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  }
  const dataset_1 = {
    label: 'Ch1',
    data: filteredChartData.map((item) => item.Ch1),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  }
  const dataset_2 = {
    label: 'Ch2',
    data: filteredChartData.map((item) => item.Ch2),
    borderColor: 'rgb(154, 0, 255)',
    backgroundColor: 'rgba(154, 0, 255, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  }
  const dataset_3 = {
    label: 'Ch3',
    data: filteredChartData.map((item) => item.Ch3),
    borderColor: 'rgb(255, 255, 0)',
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  }

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false
  };

  return (
    <div className='chart'>
      <h1 className='chart__title'>Selected File: {fileName}</h1>
      {fileData[1] && <p className='chart__date'>Date of research: {fileData[1].date.toLocaleDateString()}</p>}
      <div className='chart__container'>
        <Line data={data} options={options} width={1000} height={500}/>
      </div>
      <div className="chart__controls">
        <input
          className='chart__input'
          type="number"
          placeholder="min"
          value={range.min}
          onChange={handleMinInputChange}
        />
        <input
          className='chart__input'
          type="number"
          placeholder="max"
          value={range.max}
          onChange={handleMaxInputChange}
        />
      </div>
      <RangeSlider min={0} max={fileData.length} value={[range.min, range.max]} onInput={handleRangeChange} />
    </div>
  );
};

export default Chart;