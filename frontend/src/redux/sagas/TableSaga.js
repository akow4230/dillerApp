import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";
import {changeTableDataSize, getTableData, getTableDataSuccess} from "../reducers/TableSlice";


function* watchGetTableData(action) {
    try {
        const response = yield call(() => instance(action.payload.url, "GET"));
        yield put(getTableDataSuccess({
            data: response.data.content,
            totalPage: response.data.totalPages,
            totalElements: response.data.totalElements
        }))
    } catch (e) {

    }
}

function* watchChangeTableDataSize(action) {
    console.log(action.payload)
}


export default function* tableSaga() {
    yield takeLatest(getTableData.type, watchGetTableData)
    yield takeLatest(changeTableDataSize.type, watchChangeTableDataSize)
}