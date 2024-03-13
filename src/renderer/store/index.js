import { configureStore } from "@reduxjs/toolkit";

import chartSlice from './chart'

const store = configureStore({
    reducer: {
        chart: chartSlice
    }
})