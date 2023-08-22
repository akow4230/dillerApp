import { put, takeLatest,call } from 'redux-saga/effects';
import instance from '../../Components/utils/config/instance';
import {toast} from "react-toastify";
import {navigateTo} from "../reducers/DashboardSlice";
import {changeLoading} from "../reducers/ModalSlice";
import {getTableDataSuccess} from "../reducers/TableSlice";

function* saveValuesAsync(action) {
    try {
        yield put(changeLoading())
        const { url, data, hideModal,reset, isEditing, title } = action.payload;
        const response = yield instance(url,isEditing?"PUT":"POST", data);
        if (response!==undefined&&response?.data===401){
            toast.error("Authorization problem")
            yield put(navigateTo("/404"))
        }
        if (!response?.error){
            toast.success(`${title} saved successfully`);
            yield put(changeLoading())
        }else{
            yield put(changeLoading())
            toast.error("An error occurred please try again")
        }
    } catch (error) {
        console.log("Hello")
        toast.error("An error occurred please try again")
        yield put(changeLoading())
    }
}
export function* modalSaga() {
    yield takeLatest('modal/saveValuesAsync', saveValuesAsync);
    yield takeLatest('modal/editValuesAsync', saveValuesAsync);
}
