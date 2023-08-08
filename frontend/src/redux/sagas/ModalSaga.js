import { put, takeLatest } from 'redux-saga/effects';
import instance from '../../Components/utils/config/instance';
import {toast} from "react-toastify";
import {navigateTo} from "../reducers/DashboardSlice";

function* saveValuesAsync(action) {
    try {
        const { url, data, hideModal,reset, isEditing } = action.payload;
        console.log(url)
        const response = yield instance(url,isEditing?"PUT":"POST", data);
        console.log("hello")
        if (response!==undefined&&response.data===401){
            toast.error("Authorization problem")
            yield put(navigateTo("/404"))
        }
        toast.success(`Territory saved successfully`);
        yield put(reset());
        yield put(hideModal());
    } catch (error) {
    }
}
export function* modalSaga() {
    yield takeLatest('modal/saveValuesAsync', saveValuesAsync);
    yield takeLatest('modal/editValuesAsync', saveValuesAsync);
}
