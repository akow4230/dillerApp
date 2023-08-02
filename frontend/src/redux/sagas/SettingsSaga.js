import { call, put, takeEvery } from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";
import { getSettings, getSettingsSuccess } from "../reducers/SettingsSlice";

function* workgetSettings(action) {
  try {
    const response = yield call(() => instance("/api/v1/settings", "GET"));
    if (response.data===401){
      yield takeEvery(getSettings.type, workgetSettings);
    }else {
      yield put(getSettingsSuccess(response.data));
    }
  } catch (error) {
    yield takeEvery(getSettings.type, workgetSettings);
  }
}
export default function* settingsSaga() {
  yield takeEvery(getSettings.type, workgetSettings);
}
