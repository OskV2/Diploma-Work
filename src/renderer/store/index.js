import { configureStore } from "@reduxjs/toolkit";

import inputReducer from './input';
import chartReducer from './chart'
import chartListReducer from './chart-list'
import chartSettingsReducer from "./chart-settings";

const store = configureStore({
    reducer: {
        input: inputReducer,
        chart: chartReducer,
        chartList: chartListReducer,
        chartSettings: chartSettingsReducer,
    }
})

export default store