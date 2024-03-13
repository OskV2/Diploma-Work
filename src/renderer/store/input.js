import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    file: null,
    dragActive: false,
    error: null
};

const inputSlice = createSlice({
  name: 'input',
  initialState: initialState,
  reducers: {
    setFile(state, action) {},
    setDragActive(state, action) {},
    setError(state, action) {}
  },
});

export const inputActions = inputSlice.actions;
export default inputSlice;
