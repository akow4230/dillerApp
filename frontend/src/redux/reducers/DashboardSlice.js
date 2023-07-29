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
            console.log(action.payload.data)
            state.isLoading = false;
            if (!action.payload.error) {
                state.data = action.payload.data
            }
        },
        getDashboardFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
            if (action.payload.error) {
                state.data = action.payload.data
            }
        }
    }
})
export const {
    getDashboardDataStart,
    getDashboardSuccess,
    getDashboardFailure
} = dashboardSlice.actions

export default dashboardSlice.reducer