import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    url: "",
    pageSize: 10,
    currentPage: 1,
    data: {
        data: [],
        totalElements: 0,
        totalPage: 0,
    }

};
const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        getTableData(state, action) {
            state.url = action.payload.url
        },
        getTableDataSuccess(state, action) {
            state.data.data = action.payload.data
            state.data.totalElements = action.payload.totalElements
            state.data.totalPage = action.payload.totalPage
        },
        changeTableDataSize(state, action) {
            console.log(action.payload)
            state.pageSize = action.payload
        }
    }
})
export const {
    getTableData,
    getTableDataSuccess,
    changeTableDataSize
} = tableSlice.actions

export default tableSlice.reducer