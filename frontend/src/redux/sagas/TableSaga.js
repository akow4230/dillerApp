import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../Components/utils/config/instance";
import {
    changeOrder,
    changeTableColumns,
    changeTableDataPage,
    changeTableDataSize,
    getTableData,
    getTableDataSuccess, saveColumnsOrders, setCurrentDragingColumn, toggleModal
} from "../reducers/TableSlice";


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


export default function* tableSaga() {
    yield takeLatest(getTableData.type, watchGetTableData)
    yield takeLatest(changeTableDataSize.type, watchChangeTableDataSize)
    yield takeLatest(changeTableDataPage.type, watchChangeTableDataPage)
    yield takeLatest(changeTableColumns.type, watchChangeTableColumns)
    yield takeLatest(setCurrentDragingColumn.type, watchSetCurrentDragingColumn)
    yield takeLatest(changeOrder.type, watchChangeOrder)
    yield takeLatest(saveColumnsOrders.type, watchSaveColumnsOrders)
    yield takeLatest(toggleModal.type, watchToggleModal)
}