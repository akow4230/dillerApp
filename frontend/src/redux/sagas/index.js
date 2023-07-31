import dashboardSaga from "./DashboardSaga";
import { all } from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import {territorySaga} from "./TerritorySaga";

export default function* rootSaga() {
    yield all([dashboardSaga(),loginSaga(), territorySaga()])

}
