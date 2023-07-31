import { resetTerritory } from '../reducers/TerritorySlice';
import { call, put, takeLatest } from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";

function* saveTerritoryAsync(action) {
    try {
        const response = yield call(()=>instance("/api/v1/territory", "POST"))
        yield put(resetTerritory());
    } catch (error) {
    }
}

export function* territorySaga() {
    yield takeLatest('territory/saveTerritory', saveTerritoryAsync);
}
