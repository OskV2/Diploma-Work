import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalIsShown: false
};

const chartListSlice = createSlice({
  name: 'chartList',
  initialState: initialState,
  reducers: {
    openModal (state) {
        state.modalIsShown = true
    },

    closeModal (state) {
        state.modalIsShown = false
    },
  },
});

export const chartListActions = chartListSlice.actions;
export default chartListSlice.reducer;
