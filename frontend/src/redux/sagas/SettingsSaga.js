import { call, put, takeEvery } from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";
import {
  getSettings,
  getSettingsFailure,
  getSettingsSuccess
} from "../reducers/SettingsSlice";

function* workgetSettings(action) {
  try {
    const response = yield call(() => instance("/api/v1/settings", "GET"));
    if (response.data===401){
      yield put(getSettings());
    }else {
      yield put(getSettingsSuccess(response.data));
    }
  } catch (error) {
    yield put(getSettingsFailure(error));
  }
}
export default function* settingsSaga() {
  yield takeEvery(getSettings.type, workgetSettings);
}
