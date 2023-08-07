import dashboardSaga from "./DashboardSaga";
import { all } from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import tableSaga from "./TableSaga";
import {categorySaga} from './CustomerCategorySaga'
import {territorySaga} from "./TerritorySaga";
import settingsSaga from "./SettingsSaga";
import {modalSaga} from "./ModalSaga";
import {weekDaySaga} from './WeekDaySaga'
export default function* rootSaga() {
    yield all([
        dashboardSaga(),
        loginSaga(),
        tableSaga(),
        territorySaga(),
        settingsSaga(),
        modalSaga(),
        categorySaga(),
        weekDaySaga()
    ])
}
