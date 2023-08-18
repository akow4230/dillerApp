import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    show: true,
    data: null,
    loading: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action) => {
            state.show = true;
            state.data = action.payload;
        },
        hideModal: (state) => {
            state.show = false;
            state.data = null;
        },
        changeLoading(state) {
            state.loading = !state.loading
        }
    },
});

export const {
 showModal,
    hideModal,
    changeLoading
    } = modalSlice.actions;
export default modalSlice.reducer;
