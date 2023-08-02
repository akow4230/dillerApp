import dashboardSaga from "./DashboardSaga";
import { all } from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import tableSaga from "./TableSaga";
import {territorySaga} from "./TerritorySaga";
import settingsSaga from "./SettingsSaga";
import {modalSaga} from "./ModalSaga";

export default function* rootSaga() {
    yield all([dashboardSaga(),loginSaga(),tableSaga(), territorySaga(),settingsSaga(), modalSaga()])
}
