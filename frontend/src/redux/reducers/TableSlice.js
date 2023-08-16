import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    darkTheme: false,
    url: "",
    modal: false,
    pageSize: 5,
    currentPage: 1,
    modalColumns: [],
    currentDragingColumn: 0,
    data: {
        data: [],
        totalElements: 0,
        totalPage: 0,
        columns: []
    },
    searchParams: {
    }

};
const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        getTableData: (state, action) => {
            state.modalColumns = action.payload.columns;
            action.payload.url = action.payload.url.replaceAll("{page}", action.payload.page)
            action.payload.url = action.payload.url.replaceAll("{limit}", action.payload.size)
            state.url = action.payload.url
            state.data.columns = action.payload.columns
            state.currentPage = action.payload.page
            state.pageSize = action.payload.size
            if (action.payload.isDark !== undefined) {
                state.darkTheme = action.payload.isDark
            }
        },
        getTableDataSuccess(state, action) {
            state.data.data = action.payload.data
            state.data.totalElements = action.payload.totalElements
            state.data.totalPage = action.payload.totalPage
        },
        changeTableDataSize(state, action) {
            state.pageSize = action.payload
            state.currentPage = 1
        },
        changeTableDataPage(state, action) {
            state.currentPage = action.payload.page
        },
        toggleModal(state, action) {
            state.modal = !state.modal
        },
        setCurrentDragingColumn: (state, action) => {
            state.currentDragingColumn = action.payload;
            console.log(state.currentDragingColumn)
        },
        changeOrder: (state, action) => {
            const draggedElementIndex = state.currentDragingColumn;
            const droppedElementIndex = action.payload;

            [
                state.modalColumns[draggedElementIndex],
                state.modalColumns[droppedElementIndex],
            ] = [
                state.modalColumns[droppedElementIndex],
                state.modalColumns[draggedElementIndex],
            ];
        },
        saveColumnsOrders: (state, action) => {
            state.data.columns = state.modalColumns;
            state.modal = false
        },
        changeTableColumns: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;
            const updatedColumns = [...state.modalColumns];
            const [draggedColumn] = updatedColumns.splice(sourceIndex, 1);
            updatedColumns.splice(destinationIndex, 0, draggedColumn);

            state.modalColumns = updatedColumns;

        },
        changeTheme(state, action) {
            state.darkTheme = action.payload
        },
        changeSearchParams(state, action) {
            state.searchParams = action.payload
            state.currentPage = 1
        },
        changeCurrentPage(state) {
            state.currentPage = 1;
        },
        changeLoader(state){
            state.isLoading=!state.isLoading;
        }
    }
})
export const {
    changeLoader,
    getTableData,
    getTableDataSuccess,
    changeTableDataSize,
    changeTableDataPage,
    setCurrentDragingColumn,
    changeOrder,
    saveColumnsOrders,
    toggleModal,
    changeTableColumns,
    changeSearchParams,
    changeTheme,
    changeCurrentPage
} = tableSlice.actions

export default tableSlice.reducer

