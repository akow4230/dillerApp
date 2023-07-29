import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { getDashboardDataStart, getDashboardFailure, getDashboardSuccess, navigateTo } from "../reducers/DashboardSlice";
import DashboardService from "../services/DashboardService";

function* getDashboardData() {
    try {
        yield put(getDashboardDataStart)
        const response = yield call(DashboardService.getMainData);
        yield put(getDashboardSuccess(response))
    } catch (error) {
        yield put(getDashboardFailure(error.response.data));
        if (error.response.status === 401) {
            // Dispatch the navigation action with the path to navigate
            yield put(navigateTo('/login'));
        }
    }
}

export function* watchGetDashboardData() {
    yield takeLatest('dashboard/getDashboardData', getDashboardData);
}

export default function* dashboardSaga() {
    yield all([fork(watchGetDashboardData)]);
}
