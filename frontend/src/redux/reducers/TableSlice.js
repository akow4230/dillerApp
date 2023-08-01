import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    darkTheme: false,
    url: "",
    modal: false,
    pageSize: 10,
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
        active: '',
        city: [],
        weekDays: [],
        customerCategories: [],
        tin: '',
        week: '',
        quickSearch: ''
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
        changeTableColumns(state, action) {
            state.data.columns = action.payload.columns;
            // Find the column object with the matching ID and update its checked property
            for (let i = 0; i < state.data.columns.length; i++) {
                if (state.data.columns[i].id === action.payload.id) {
                    state.data.columns[i].show = action.payload.checked;
                    break;
                }
            }
        },
        changeTheme(state, action) {
            state.darkTheme = action.payload
        },
        changeSearchParams(state, action) {
            state.searchParams = action.payload
            console.log(action.payload)
        }
    }
})
export const {
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
    changeTheme
} = tableSlice.actions

export default tableSlice.reducer

