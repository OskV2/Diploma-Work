import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalIsShown: false
};

const chartSettingsSlice = createSlice({
  name: 'chartSettings',
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

export const chartSettingsActions = chartSettingsSlice.actions;
export default chartSettingsSlice.reducer;
