import {call, put, takeLatest, select } from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";
import {
    saveClientsAction,
    editClientsAction,
    resetTerritory,
    setModalVisible,
    setMapState,
    setLongitude,
    setLatitude,
    setTemplate,
    setEditModalVisible,
    fetchClientsFailure,
    fetchClientsStart, fetchClientsSuccess,
} from "../reducers/ClientsSlice";
import { toast } from "react-toastify";
import {navigateTo} from "../reducers/DashboardSlice";
function* saveClientsAsync(action) {
    try {
        console.log(action.payload)
        const { clients, isEditing } = action.payload;
        if (!clients.longitude || !clients.latitude) {
            toast.error("You must select territory");
            return;
        }
        const response = yield instance(
            `/api/v1/client${isEditing ? "/" + clients.id : ""}`,
            isEditing ? "PUT" : "POST",
            {
                territory: clients.territory,
                name: clients.name,
                address:clients.address,
                telephone:clients.telephone,
                tin:clients.tin,
                category:clients.category,
                companyName:clients.companyName,
                referencePoint:clients.referencePoint,
                weekDays:clients.weekDays
            }
        );
        console.log(response)
        if (response!==undefined&&response.data===401){
            toast.error("Authorization problem")
            yield put(navigateTo("/404"))
        }
        yield put(resetTerritory());
        toast.success(`Client ${isEditing ? "edited" : "saved"} successfully`);
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
        const territory = yield select((state) => state.clients);

        if (coords !== territory.template) {
            const latitude = coords[0];
            const longitude = coords[1];
            yield put(setTemplate([latitude, longitude]));
            yield put(setLatitude(latitude));
            yield put(setLongitude(longitude));
            yield put(setMapState({ center: [latitude, longitude], zoom: 5 }));
        }
    } catch (error) {
    }
}

function* fetchClientsSaga() {
    try {
        const response = yield call(() => instance("/api/v1/client/all", "GET"))
        yield put(fetchClientsSuccess(response.data));
        // console.log(response)
    } catch (error) {
        yield put(fetchClientsFailure(error.message));
    }
}
export function* clientsSaga() {
    yield takeLatest(saveClientsAction.type, saveClientsAsync);
    yield takeLatest(editClientsAction.type, saveClientsAsync);
    yield takeLatest("clients/handleMapClear", handleMapClearAsync);
    yield takeLatest("clients/handleMapClick", handleMapClickAsync);
    yield takeLatest(fetchClientsStart.type, fetchClientsSaga);

}
