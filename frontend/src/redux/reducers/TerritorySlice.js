import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: false,
    navigation: "",
    modalVisible: false,
    editModalVisible: false,
    template: [],
    defValueOfMap: [41.3775, 64.5853],
    mapState: { center:[41.3775, 64.5853], zoom: 5 },
    placeName: "",
    latitude: "",
    longitude: "",
};

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
        setTemplate:(state, action) =>{
            state.template = action.payload
        },
        setMapState:(state, action)=>{
            state.mapState = action.payload
        },
        saveTerritoryAction: (state, action) => {},
        editTerritoryAction: (state, action) => {}
    }
});
export const {
    setModalVisible,
    setLatitude,
    setLongitude,
    setMapState,
    setRegion,
    setTemplate,
    setPlaceName,
    resetTerritory,
    setEditModalVisible,
    saveTerritoryAction,
    editTerritoryAction
} = territorySlice.actions
export default territorySlice.reducer;