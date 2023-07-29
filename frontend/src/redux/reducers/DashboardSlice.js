import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    data: {},
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        navigateTo(state, action) {
            // Handle the navigation action here
            const { payload } = action;
            // Use an external library or utility function (e.g., history or window.location) for navigation
            // For example, if you are using 'history':
            // history.push(payload);
            // Or if you are using 'window.location':
            window.location.href = payload;
        },
        getDashboardDataStart: (state) => {
            state.isLoading = true;
        },
        getDashboardSuccess: (state, action) => {
            console.log(action.payload.data);
            state.isLoading = false;
            if (!action.payload.error) {
                state.data = action.payload.data;
            }
        },
        getDashboardFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            if (action.payload.error) {
                state.data = action.payload.data;
            }
        },
    },
});

export const {
    getDashboardDataStart,
    getDashboardSuccess,
    getDashboardFailure,
    navigateTo,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
