import XLSX from 'xlsx';

export const parseExcel = async (file) => {
  return new Promise((resolve, reject) => {
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
        resolve(XL_row_object);
      });
    };

    reader.readAsBinaryString(file);
  });
};

const convertExcelDate = (excelDate) => {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return date;
};

const convertExcelTime = (excelTime) => {
  let timeInSeconds;

  if (excelTime > 1) {
    timeInSeconds = (excelTime - 1) * 86400;
  } else {
    timeInSeconds = excelTime * 86400;
  }

  let time = new Date(timeInSeconds * 1000).toISOString().slice(11, 19);
  return time;
};

export const convertObject = (fileData) => {
  if (fileData.length > 1) {
    try {
      return fileData
      .map((item, index) => {
        const date = convertExcelDate(item.Date);
        const time = convertExcelTime(item.Time);
        let ID = index + 1;
      
        let result = {
          ID,
          date,
          time,
        };
      
        ['Ch0', 'Ch1', 'Ch2', 'Ch3'].forEach(key => {
          if (key in item) {
            result[key] = [item[key], parseInt(item[key]) + parseInt(273)];
          }
        });
      
        return result;
      })
      .filter(Boolean);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  }
};
