import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    territory:[],
    isLoading: false,
    error: false,
    navigation: "",
    modalVisible: false,
    editModalVisible: false,
    template: [],
    defValueOfMap: [39.80371130542207,64.42121357128899],
    mapState: { center:[39.80371130542207,64.42121357128899 ], zoom: 10 },
    placeName: "",
    latitude: "",
    longitude: "",
    editData:{}
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
        setEditData:(state,action)=>{
          state.editData = action.payload
        },
        saveTerritoryAction: (state, action) => {},
        editTerritoryAction: (state, action) => {},
        fetchTerritoryStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTerritorySuccess: (state, action) => {
            state.territory = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchTerritoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
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
    editTerritoryAction,
    setEditData,
    fetchTerritoryStart,
    fetchTerritoryFailure,
    fetchTerritorySuccess
} = territorySlice.actions
export default territorySlice.reducer;