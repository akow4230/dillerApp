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
    editData:{},
    preCloseShow:false,
    loading:false
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
        setCloseModal(state, action) {
          state.modalVisible = false;
          state.editModalVisible = false;
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
        setPreClose:(state, action)=>{
            state.preCloseShow = action.payload
        },
        changeLoading:(state)=>{
            state.loading = !state.loading
        },
        setLoading:(state, action)=>{
            state.loading = action.payload
        }
    }
});
export const {
    setModalVisible,
    setLatitude,
    setLongitude,
    setMapState,
    changeLoading,
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
    fetchTerritorySuccess,
    setCloseModal,
    setPreClose,
    setLoading
} = territorySlice.actions
export default territorySlice.reducer;