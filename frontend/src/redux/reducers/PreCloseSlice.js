import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
};

const preCloseSlice = createSlice({
    name: 'preCloseSlice',
    initialState,
    reducers: {
        setShow: (state, action) => {
            state.show = action.payload;
        },
    },
});

export const { setShow } = preCloseSlice.actions;
export default preCloseSlice.reducer;
