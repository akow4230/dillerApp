import {call, put, takeLatest} from "redux-saga/effects";
import {signUserStart, UserFailure, UserLogIn, UserSuccess} from "../reducers/LoginSlice";
import axios from "axios";
import { push } from "connected-react-router";

function* workLoginUser(action) {
  try {
    yield put(signUserStart());
    const response = yield call(() =>
        axios.post(
            "http://localhost:8080/api/v1/auth/login",
            action.payload.formData
        )
    );
    console.log(response.data);
    if (response.data.refresh_token) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    } else {
      localStorage.setItem("access_token", response.data.access_token);
    }
    yield put(UserSuccess());

    // Call the navigate function from the payload directly
    if (response.data.roles[0].name === "ROLE_SUPER_ADMIN") {
      action.payload.navigate("/dashboard");
    }
  } catch (error) {
    yield put(UserFailure(error.data));
  }
}

export default function* loginSaga() {
  yield takeLatest(UserLogIn.type, workLoginUser);
}
