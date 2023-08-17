import {call, put, takeLatest, select } from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";
import {
    saveTerritoryAction,
    editTerritoryAction,
    resetTerritory,
    setModalVisible,
    setMapState,
    setLongitude,
    setLatitude,
    setTemplate,
    setEditModalVisible,
    fetchTerritorySuccess,
    fetchTerritoryFailure, fetchTerritoryStart,
} from "../reducers/TerritorySlice";
import { toast } from "react-toastify";
import {navigateTo} from "../reducers/DashboardSlice";
function* saveTerritoryAsync(action) {
    try {
        const { territory, isEditing, reset } = action.payload;
        if (!territory.longitude || !territory.latitude) {
            toast.error("You must select territory");
            return;
        }
        const response = yield instance(
            `/api/v1/territory${isEditing ? "/" + territory.id : ""}`,
            isEditing ? "PUT" : "POST",
            {
                title: territory.title,
                code: territory.code,
                active: territory.active,
                longitude: territory.longitude,
                latitude: territory.latitude,
                region: territory.region,
            }
        );
        console.log(response)
        if (response!==undefined&&response.data===401){
            toast.error("Authorization problem")
            yield put(navigateTo("/404"))
        }
        yield put(resetTerritory());
        toast.success(`Territory ${isEditing ? "edited" : "saved"} successfully`);
        yield put(setModalVisible(false));
        yield put(setEditModalVisible(false));
    } catch (error) {
        toast.error("An error occurred. Please try again later.");
    }
}
function* handleMapClearAsync(action) {
    try {
        const { mapState, defValueOfMap } = action.payload;

        yield put(setMapState({ ...mapState, center: defValueOfMap }));

        yield put(setLongitude(""));
        yield put(setLatitude(""));
    } catch (error) {
        toast.error("An error occurred. Please try again later.");
    }
}
function* handleMapClickAsync(action) {
    try {
        const coords = action.payload;
        const territory = yield select((state) => state.territory);

        if (coords !== territory.template) {
            const latitude = coords[0];
            const longitude = coords[1];
            yield put(setTemplate([latitude, longitude]));
            yield put(setLatitude(latitude));
            yield put(setLongitude(longitude));
            yield put(setMapState({ center: [latitude, longitude], zoom: 10 }));
        }
    } catch (error) {
    }




}

function* fetchTerritorySaga() {
    try {
        const response = yield call(() => instance("/api/v1/territory/all", "GET"))
        yield put(fetchTerritorySuccess(response.data));
        // console.log(response)
    } catch (error) {
        yield put(fetchTerritoryFailure(error.message));
    }
}
export function* territorySaga() {
    yield takeLatest(saveTerritoryAction.type, saveTerritoryAsync);
    yield takeLatest(editTerritoryAction.type, saveTerritoryAsync);
    yield takeLatest("territory/handleMapClear", handleMapClearAsync);
    yield takeLatest("territory/handleMapClick", handleMapClickAsync);
    yield takeLatest(fetchTerritoryStart.type, fetchTerritorySaga);

}
