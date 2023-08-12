// categorySaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } from '../reducers/CustomerCategorySlice';
import instance from "../../Components/utils/config/instance";

function* fetchCategoriesSaga() {
    try {
        const response = yield call(() => instance("/api/v1/customercategory/all", "GET"))

        yield put(fetchCategoriesSuccess(response.data));
        // console.log(response)
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message));
    }
}
export function* categorySaga() {
    yield takeLatest(fetchCategoriesStart.type, fetchCategoriesSaga);
}
