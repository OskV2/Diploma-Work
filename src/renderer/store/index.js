import { configureStore } from "@reduxjs/toolkit";

import inputReducer from './input';
import chartReducer from './chart'

const store = configureStore({
    reducer: {
        input: inputReducer,
        chart: chartReducer,
    }
})

export default store