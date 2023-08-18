import { put, takeLatest } from 'redux-saga/effects';
import instance from '../../Components/utils/config/instance';
import {toast} from "react-toastify";
import {navigateTo} from "../reducers/DashboardSlice";
import {changeLoading} from "../reducers/ModalSlice";

function* saveValuesAsync(action) {
    try {
        yield put(changeLoading())
        const { url, data, hideModal,reset, isEditing, title } = action.payload;
        console.log(url)
        const response = yield instance(url,isEditing?"PUT":"POST", data);
        console.log("hello")
        console.log(response)
        if (response!==undefined&&response.data===401){
            toast.error("Authorization problem")
            yield put(navigateTo("/404"))
        }
        if (!response.error){
            toast.success(`${title} saved successfully`);
            yield put(changeLoading())
        }else{
            toast.error("An error occurred please try again")
        }
    } catch (error) {
        toast.error("An error occurred please try again")
        yield put(changeLoading())
    }
}
export function* modalSaga() {
    yield takeLatest('modal/saveValuesAsync', saveValuesAsync);
    yield takeLatest('modal/editValuesAsync', saveValuesAsync);
}
