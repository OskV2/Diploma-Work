import { configureStore } from '@reduxjs/toolkit';

import inputReducer from './input';
import chartReducer from './chart';
import chartListReducer from './chart-list';
import chartSettingsReducer from './chart-settings';

const store = configureStore({
  reducer: {
    input: inputReducer,
    chart: chartReducer,
    chartList: chartListReducer,
    chartSettings: chartSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['input/setFileData', 'input/setFile'],
        ignoredActionPaths: ['payload.date'],
        ignoredPaths: ['input.file', 'input.fileData', 'chart.lastClickedPoint'],
      },
    }),
});

export default store;
