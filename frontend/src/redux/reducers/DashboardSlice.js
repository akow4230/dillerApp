import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    data: {},
}
export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        getDashboardDataStart: (state) => {
            state.isLoading = true;
        },
        getDashboardSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        },
        getDashboardFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})
export const {
    getDashboardDataStart,
    getDashboardSuccess,
    getDashboardFailure
} = dashboardSlice.actions

export default dashboardSlice.reducer