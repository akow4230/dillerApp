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
import {toast} from "react-toastify";
import {navigateTo} from "../reducers/DashboardSlice";


function* watchGetTableData(action) {
    // console.log(action.payload.search)

    let category=[]
    action.payload.search.category?.map(item=>{
        category.push(item.value)
    })
    let weekDay=[]
    action.payload.search.weekDay?.map(item=>{
        weekDay.push(item.value)
    })
     let territory=[]
    action.payload.search.territory?.map(item=>{
        territory?.push(item?.value)
    })
    try {
        // console.log(action.payload.url)
        const response = yield call(() => instance(action.payload.url, "GET", null, {active:action?.payload?.search?.active?.value, quickSearch:action.payload.search.quickSearch, category:category.join(','), weekDay:weekDay.join(','), tin:action.payload.search.tin?.value, territory:territory.join(',')}));
        // console.log(response.data)
        if (response.data === "Invalid token" || response.data === 401){
            toast.error("Authorization problem")
            yield put(navigateTo("/404"))
        }
        yield put(getTableDataSuccess({
            data: response.data.content,
            totalPage: response.data.totalPages,
            totalElements: response.data.totalElements
        }))
        // console.log(response.data)
    } catch (e) {
        toast.error(e.message)
        yield put(navigateTo("/404"))
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