import { call, put, takeLatest } from 'redux-saga/effects';
import instance from '../../Components/utils/config/instance';
import { hideModal } from '../reducers/modalSlice';

function* saveValuesAsync(action) {
    try {
        const { url, data } = action.payload;
        yield call(instance, url, 'POST', data);
        yield put(hideModal());
    } catch (error) {
    }
}

export function* modalSaga() {
    yield takeLatest('modal/saveValuesAsync', saveValuesAsync);
}
