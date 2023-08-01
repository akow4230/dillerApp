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
            const { payload } = action;
            window.location.href = payload; // Use window.location.href for navigation
        },
        getDashboardDataStart: (state) => {
            state.isLoading = true;
        },
        getDashboardSuccess: (state, action) => {
            state.isLoading = false;
            if (!action.payload.error) {
                state.data = action.payload.data;
            }else {
                state.error = action.payload.error
            }
        },
        getDashboardFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log("HEl")
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
