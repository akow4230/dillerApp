// Import the necessary functions and dependencies
import { resetTerritory } from '../reducers/TerritorySlice';
import { call, put, takeLatest } from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";

// Saga for saving territory
function* saveTerritoryAsync(action) {
    try {
        console.log("Hello")
        const response = yield call(instance, "/api/v1/territory", "POST", {
            title: action.payload.title,
            code: action.payload.code,
            active: action.payload.active,
            longitude: action.payload.longitude,
            latitude: action.payload.latitude,
            region: action.payload.region
        });
        yield put(resetTerritory());
    } catch (error) {
        // Handle the error, if needed
    }
}

// Saga for editing territory
function* editTerritoryAsync(action) {
    try {
        const response = yield call(instance, "/api/v1/territory/" + action.payload.id, "PUT", {
            title: action.payload.title,
            code: action.payload.code,
            active: action.payload.active,
            longitude: action.payload.longitude,
            latitude: action.payload.latitude,
            region: action.payload.region
        });
        yield put(resetTerritory());
    } catch (error) {
        // Handle the error, if needed
    }
}

// Export the territorySaga as a generator function
export function* territorySaga() {
    yield takeLatest('territory/saveTerritory', saveTerritoryAsync);
    yield takeLatest('territory/editTerritory', editTerritoryAsync);
}
