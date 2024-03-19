import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // RANGE OF POINTS THAT ARE DISPLAYED ON CHART
  range: {
    min: 0,
    max: 250,
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
    setMinRange (state, action) {
        state.range.min = action.payload
    },

    setMaxRange (state, action) {
        state.range.max = action.payload
    },

    setRange (state, action) {
        state.range.min = action.payload.min
        state.range.max = action.payload.max
    },

    setTemperature(state) {
        state.temperature = !state.temperature
    },

    setTime(state) {
        state.time = !state.time
    },

    addAnnotation(state, action) {
      state.annotationPoints.push(action.payload);
    },
      
    deleteAnnotation(state, action) {
      state.annotationPoints = state.annotationPoints.filter(id => id !== action.payload);
    },

    setLastClickedPoint (state, action) {
        state.lastClickedPoint = action.payload
    },

    openModal (state) {
        state.modalIsShown = true
    },

    closeModal (state) {
        state.modalIsShown = false
    },
  },
});

export const chartActions = chartSlice.actions
export default chartSlice.reducer