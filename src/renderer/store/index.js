import { configureStore } from "@reduxjs/toolkit";

import inputReducer from './input';
import chartReducer from './chart'
import chartListReducer from './chart-list'

const store = configureStore({
    reducer: {
        input: inputReducer,
        chart: chartReducer,
        chartList: chartListReducer,
    }
})

export default store