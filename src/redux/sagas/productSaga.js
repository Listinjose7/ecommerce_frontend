import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_PRODUCTS, SET_PRODUCTS } from '../types';
import { API } from '../../api/api';

function* fetchProductsWorker() {
  const res = yield call(() => API.get('/products'));
  yield put({ type: SET_PRODUCTS, payload: res.data });
}

export default function* productSaga() {
  yield takeEvery(FETCH_PRODUCTS, fetchProductsWorker);
}
