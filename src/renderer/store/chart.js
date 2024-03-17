import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // RANGE OF POINTS THAT ARE DISPLAYED ON CHART
  range: {
    min: 0,
    max: 1000,
  },
  // TEMPERATURE THAT IS DISPLAYED ON CHART // true = Celsius, false = Kelvin
  temperature: true,
  // TIME FORMAT THAT IS DISPLAYED ON CHART // true = real time, false = seconds
  time: true,
  // ARRAY OF ID'S OF POINTS THAT HAVE ANNOTATION ADDED
  annotationPoints: [],
  lastClickedPoint: null,
  modalIsShown: false,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState: initialState,
  reducers: {
    setMinRange (state, action) {},
    setMaxRange (state, action) {},
    setRange (state, action) {},
    addAnnotation (state, action) {},
    deleteAnnotation (state, action) {},
    setLastClickedPoint (state, action) {},
    openModal (state) {},
    closeModal (state) {},
  },
});

export const chartActions = chartSlice.actions
export default chartSlice.reducer