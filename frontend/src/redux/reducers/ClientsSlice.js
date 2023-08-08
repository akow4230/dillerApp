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
    selectedWeekdays: []
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
    deleteWeekday
} = territorySlice.actions
export default territorySlice.reducer;