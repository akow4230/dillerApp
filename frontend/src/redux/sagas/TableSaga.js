import {call, put, takeLatest,takeEvery} from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";
import {
    changeSearchParams,
    changeTableColumns,
    changeTableDataPage,
    changeTableDataSize,
    changeTheme,
    getTableData,
    getTableDataSuccess
} from "../reducers/TableSlice";


function* watchGetTableData(action) {
    try {
        const response = yield call(() => instance(action.payload.url, "GET", null, {active:action.payload.search.active.value, quickSearch:action.payload.search.quickSearch}));
        yield put(getTableDataSuccess({
            data: response.data.content,
            totalPage: response.data.totalPages,
            totalElements: response.data.totalElements
        }))
         console.log(response.data)
    } catch (e) {

    }
}

function* watchChangeTableDataSize(action) {
}

function* watchChangeTableDataPage(action) {
}

function* watchChangeTableColumns(action) {
}

function* watchSetCurrentDragingColumn(action) {
}

function* watchChangeOrder(action) {
}

function* watchSaveColumnsOrders(action) {
}

function* watchToggleModal(action) {
}

function* watchChangeTheme(action) {
}

function* watchChangeSearchParams(action) {
}


export default function* tableSaga() {
    yield takeEvery(getTableData.type, watchGetTableData)
    yield takeLatest(changeTableDataSize.type, watchChangeTableDataSize)
    yield takeLatest(changeTableDataPage.type, watchChangeTableDataPage)
    yield takeLatest(changeTableColumns.type, watchChangeTableColumns)
    yield takeLatest('table/setCurrentDragingColumn', watchSetCurrentDragingColumn)
    yield takeLatest('table/changeOrder', watchChangeOrder)
    yield takeLatest('table/saveColumnsOrders', watchSaveColumnsOrders)
    yield takeLatest('table/toggleModal', watchToggleModal)
    yield takeLatest(changeSearchParams.type, watchChangeSearchParams)
    yield takeLatest(changeTheme.type, watchChangeTheme)
}