import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {getDashboardDataStart, getDashboardFailure, getDashboardSuccess} from "../reducers/DashboardSlice";
import DashboardService from "../services/DashboardService";
import {push} from "connected-react-router";

function* getDashboardData() {
    try {
        yield put(getDashboardDataStart)
        const response = yield call(DashboardService.getMainData);
        yield put(getDashboardSuccess(response))
    } catch (error) {
        yield put(getDashboardFailure(error.response.data))
        yield put(push('/'))
    }
}

export function* watchGetDashboardData() {
    yield takeLatest('dashboard/getDashboardData', getDashboardData);
}

export default function* dashboardSaga() {
    yield all([fork(watchGetDashboardData)]);
}