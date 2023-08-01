import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: false,
    navigation:"",
    modalVisible:false,
    editModalVisible:false,
    placeName: "",
    latitude: "",
    longitude: "",
    formData: {
        title:"",
        code:"",
        active:false,
        longitude:0,
        latitude:0,
        region:""
    }
}
export const territorySlice = createSlice({
    name: "territory",
    initialState,
    reducers: {
        setModalVisible(state, action) {
            state.modalVisible = action.payload
        },
        setEditModalVisible(state, action) {
            state.editModalVisible = action.payload
        },
        setPlaceName: (state, action) => {
            state.placeName = action.payload;
        },
        setLatitude: (state, action) => {
            state.latitude = action.payload;
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload;
        },
        resetTerritory: (state) => {
            state.placeName = "";
            state.latitude = "";
            state.longitude = "";
        },
        setRegion: (state, action) => {
            state.region = action.payload;
        },
    }
});
export const {
    setModalVisible,
    setLatitude,
    setLongitude,
    setPlaceName,
    resetTerritory,
    setEditModalVisible
} = territorySlice.actions
export default territorySlice.reducer;