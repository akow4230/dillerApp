import {all} from "redux-saga/effects"
import dashboardSaga from "./DashboardSaga";

export default function* rootSaga() {
    yield all([dashboardSaga()])
}