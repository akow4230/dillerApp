import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    clients: [],
    isLoading: false,
    error: false,
    navigation: "",
    modalVisible: false,
    editModalVisible: false,
    template: [],
    defValueOfMap: [41.3775, 64.5853],
    mapState: {center: [41.3775, 64.5853], zoom: 5},
    placeName: "",
    latitude: "",
    longitude: "",
    editData: {},
    selectedWeekdays: [],
    clientMapModal:false,
    preCloseShow:false,
    loading:false
};

export const territorySlice = createSlice({
    name: "clients",
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
        setTemplate: (state, action) => {
            state.template = action.payload
        },
        setMapState: (state, action) => {
            state.mapState = action.payload
        },
        setEditData: (state, action) => {
            state.editData = action.payload
        },
        setOneClientMapModal:(state)=>{
            state.clientMapModal=!state.clientMapModal
        },
        saveClientsAction: (state, action) => {
        },
        editClientsAction: (state, action) => {
        },
        fetchClientsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchClientsSuccess: (state, action) => {
            state.clients = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchClientsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedWeekdays: (state, action) => {
            state.selectedWeekdays = action.payload;
        },
        pushWeekday: (state, action) => {
            state.selectedWeekdays.push(action.payload)
        },
        deleteWeekday: (state, action) => {
            state.selectedWeekdays = state.selectedWeekdays.filter(day => day.id !== action.payload.id);
        },
        closeModals:(state, action)=>{
            state.editModalVisible = false
            state.modalVisible = false
        },
        setPreClose:(state, action)=>{
            state.preCloseShow = action.payload
        },
        changeLoading:(state) =>{
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
    setRegion,
    setTemplate,
    setPlaceName,
    changeLoading,
    resetTerritory,
    setEditModalVisible,
    saveClientsAction,
    editClientsAction,
    setEditData,
    fetchClientsStart,
    fetchClientsFailure,
    fetchClientsSuccess,
    setSelectedWeekdays,
    pushWeekday,
    deleteWeekday,
    setOneClientMapModal,
    setPreClose,
    closeModals,
    setLoading
} = territorySlice.actions
export default territorySlice.reducer;