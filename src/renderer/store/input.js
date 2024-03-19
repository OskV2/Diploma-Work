import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    file: null,
    fileData: [],
    dragActive: false,
    error: null,
    header: 'default'
};

const inputSlice = createSlice({
  name: 'input',
  initialState: initialState,
  reducers: {
    setFile(state, action) {
        state.file = action.payload
    },

    setFileData(state, action) {
        state.fileData = action.payload
    },

    setDragActive(state, action) {
        state.dragActive = action.payload
    },

    setError(state, action) {
        state.error = action.payload
    },

    setHeader(state, action) {
        state.header = action.payload
    }
  },
});

export const inputActions = inputSlice.actions;
export default inputSlice.reducer;
