import { useState, useEffect } from 'react';
import XLSX from 'xlsx';

import Back from '../components/Back/Back';
import Input from '../components/Input/Input';
import Chart from '../components/Chart/Chart';

const DisposablePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  let arrayToConvert = [];
  let transformedData = [];

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
        setFileData(json_object)
      });
    };

    reader.readAsBinaryString(file);
  };

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

  useEffect(() => {
    if (selectedFile) {
      parseExcel(selectedFile);
    }
  }, [selectedFile]);

  if (fileData.length > 1) {
    try {
      arrayToConvert = JSON.parse(fileData);
      
      transformedData = arrayToConvert.map((item, index) => {
        const date = convertExcelDate(item.Date)
        const time = convertExcelTime(item.Time)
        let ID = index
        
        if ('Ch3' in item) {
          return { ID, date, time, Ch0: item.Ch0, Ch1: item.Ch1, Ch2: item.Ch2, Ch3: item.Ch3 };
        }
        if ('Ch2' in item) {
          return { ID, date, time, Ch0: item.Ch0, Ch1: item.Ch1, Ch2: item.Ch2 };
        }
        if ('Ch1' in item) {
          return { ID, date, time, Ch0: item.Ch0, Ch1: item.Ch1 };
        }
        if ('Ch0' in item) {
          return { ID, date, time, Ch0: item.Ch0 };
        }
      });
    } catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  }

  return (
    <>
      <Back />
      {!selectedFile && <Input setSelectedFile={setSelectedFile} />}
      {selectedFile && <Chart fileData={transformedData} fileName={selectedFile.name} />}
    </>
  );
};

export default DisposablePage;
