
import { call, put, takeLatest } from "redux-saga/effects";
import {fetchWeekdaysSuccess, fetchWeekdaysFailure, fetchWeekdaysStart} from "../reducers/WeekDaySlice";
import instance from "../../Components/utils/config/instance";

function* fetchWeekdaysSaga() {
    try {
        const response = yield call(() => instance("/api/v1/weekday", "GET"))
        yield put(fetchWeekdaysSuccess(response.data));
    } catch (error) {
        yield put(fetchWeekdaysFailure(error.message));
    }
}

export function* weekDaySaga() {
    yield takeLatest(fetchWeekdaysStart.type, fetchWeekdaysSaga);
}

