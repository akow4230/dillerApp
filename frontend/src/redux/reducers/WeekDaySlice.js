
import { createSlice } from "@reduxjs/toolkit";

const weekdaySlice = createSlice({
    name: "weekday",
    initialState: {
        weekdays: [],
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
            state.weekdays = action.payload;

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
} = weekdaySlice.actions;

export default weekdaySlice.reducer;
