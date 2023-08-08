import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    loading: false,
    error: null,
    modalVisible: false
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
        }
    },
});

export const {fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure, setModalVisible} = categorySlice.actions;
export default categorySlice.reducer;
