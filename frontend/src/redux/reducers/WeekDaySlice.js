// src/redux/weekdaysSlice.js

import { createSlice } from "@reduxjs/toolkit";

const weekdaysSlice = createSlice({
    name: "weekdays",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchWeekdaysStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchWeekdaysSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
        },
        fetchWeekdaysFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchWeekdaysStart,
    fetchWeekdaysSuccess,
    fetchWeekdaysFailure,
} = weekdaysSlice.actions;

export default weekdaysSlice.reducer;
