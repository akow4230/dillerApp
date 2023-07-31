import dashboardSaga from "./DashboardSaga";
import { all } from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import tableSaga from "./TableSaga";

export default function* rootSaga() {
    yield all([dashboardSaga(),loginSaga(),tableSaga()])
}
