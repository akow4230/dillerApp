import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    loading: false,
    error: null,
    modalVisible: false,
    editModalVisible: false,
    editData: {},
    editDataUrl: "",
    preCloseShow:false
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchCategoriesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCategoriesSuccess: (state, action) => {
            state.categories = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCategoriesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setModalVisible: (state, action) => {
            state.modalVisible = action.payload
        },
        setEditModalVisible: (state, action) => {
            state.editModalVisible = action.payload
        },
        setEditData: (state, action) => {
            state.editData = action.payload
        },
        setEditDataUrl: (state, action) => {
            state.editDataUrl = action.payload;
        },
        setCloseModals: (state, action) => {
            state.editModalVisible = false
            state.modalVisible = false
        },
        setPreClose:(state,action)=>{
            state.preCloseShow=action.payload
        }
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    setModalVisible,
    setEditModalVisible,
    setEditData,
    setEditDataUrl,
    setCloseModals,
    setPreClose
} = categorySlice.actions;
export default categorySlice.reducer;
