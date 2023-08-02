import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: true,
    data: null,
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
    },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
