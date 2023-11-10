import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import './Chart.scss'

ChartJS.register(...registerables);

const Chart = ({ selectedFile }) => {
  const [fileOutput, setFileOutput] = useState([]);
  let arrayToConvert = [];
  let transformedData = []

  const parseExcel = (file) => {
    let reader = new FileReader();

    reader.onload = function (e) {
      let data = e.target.result;
      let workbook = XLSX.read(data, {
        type: 'binary',
      });

      workbook.SheetNames.forEach(function (sheetName) {
        let XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName],
        );
        let json_object = JSON.stringify(XL_row_object);
        setFileOutput(json_object);
      });
    };

    reader.readAsBinaryString(file);
  };

  parseExcel(selectedFile);

  const convertExcelDate = (excelDate) => {
    const date = new Date((excelDate - 25569) * 86400 * 1000);
    return date
  }

  const convertExcelTime = (excelTime) => {
    let timeInSeconds;

    if (excelTime > 1) {
      timeInSeconds = (excelTime - 1) * 86400;
    } else {
      timeInSeconds = excelTime * 86400;
    }

    let time = new Date(timeInSeconds * 1000).toISOString().slice(11, 19)
    return time
  }

  try {
    arrayToConvert = JSON.parse(fileOutput);
    
    transformedData = arrayToConvert.map((item) => {
      const date = convertExcelDate(item.Date)
      const time = convertExcelTime(item.Time)
      
      if ('Ch3' in item) {
        return { date, time, Ch0: item.Ch0, Ch1: item.Ch1, Ch2: item.Ch2, Ch3: item.Ch3 };
      }
      if ('Ch2' in item) {
        return { date, time, Ch0: item.Ch0, Ch1: item.Ch1, Ch2: item.Ch2 };
      }
      if ('Ch1' in item) {
        return { date, time, Ch0: item.Ch0, Ch1: item.Ch1 };
      }
      if ('Ch0' in item) {
        return { date, time, Ch0: item.Ch0 };
      }
    });
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }

  const [range, setRange] = useState({ min: 0, max: transformedData.length });  

  const handleMinInputChange = (e) => {
    setRange({ ...range, min: e.target.value });
  };

  const handleMaxInputChange = (e) => {
    setRange({ ...range, max: e.target.value });
  };

  const handleRangeChange = (newRange) => {
    setRange({ min: newRange[0] , max: newRange[1] });
  };

  const filteredChartData = transformedData.slice(
    range.min ? parseInt(range.min, 10) : 0,
    range.max ? parseInt(range.max, 10) : transformedData.length
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
  },
  const dataset_1 = {
    label: 'Ch1',
    data: filteredChartData.map((item) => item.Ch1),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  },
  const dataset_2 = {
    label: 'Ch2',
    data: filteredChartData.map((item) => item.Ch2),
    borderColor: 'rgb(154, 0, 255)',
    backgroundColor: 'rgba(154, 0, 255, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  },
  const dataset_3 = {
    label: 'Ch3',
    data: filteredChartData.map((item) => item.Ch3),
    borderColor: 'rgb(255, 255, 0)',
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
    borderWidth: 1,
    pointRadius: 2,
  },

  const datasets = [ dataset_0 ];
  
  if (transformedData.some((item) => 'Ch1' in item)) {
    datasets.push(dataset_1);
  }

  if (transformedData.some((item) => 'Ch2' in item)) {
    datasets.push(dataset_2);
  }

  if (transformedData.some((item) => 'Ch3' in item)) {
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
      <h1 className='chart__title'>Selected File: {selectedFile.name}</h1>
      {transformedData[1] && <p className='chart__date'>Date of research: {transformedData[1].date.toLocaleDateString()}</p>}
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
      <RangeSlider min={0} max={transformedData.length} value={[range.min, range.max]} onInput={handleRangeChange} />
    </div>
  );
};

export default Chart;