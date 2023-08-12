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
        const { longitude,latitude, id,data } = action.payload.clients;
        const { isEditing } = action.payload;
        if (!longitude || !latitude) {
            toast.error("You must select territory");
            return;
        }
        const response = yield instance(
            `/api/v1/client${isEditing ? "/" + id : ""}`,
            isEditing ? "PUT" : "POST",
            {
                name: data.name,
                companyName:data.companyName,
                territory: data.territory.value,
                address:data.address,
                phone:data.phone,
                referencePoint:data.referencePoint,
                tin:data.tin,
                category:data.category.value,
                weekdays:data.weekdays,
                longitude,
                latitude,
                active:data.active
            }
        );
        console.log(response)
        if (response!==undefined&&response.data===401){
            toast.error("Authorization problem")
            yield put(navigateTo("/404"))
        }else if(response?.error){
            throw new Error("Unique error")
        }
        yield put(resetTerritory());
        toast.success(`Client ${isEditing ? "edited" : "saved"} successfully`);
        yield put(setModalVisible(false));
        yield put(setEditModalVisible(false));
    } catch (error) {
        // console.log(error.message)
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
        const response = yield call(() => instance("/api/v1/client", "GET"))
        yield put(fetchClientsSuccess(response.data.content));
        // console.log(response.data.content)
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
