import { createSlice } from "@reduxjs/toolkit";
import {useCustomNavigate} from "./useCustomNavigate"; // Import the useNavigate hook

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
            window.location.href = payload; // Use window.location.href for navigation
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
