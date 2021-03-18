import { all } from 'redux-saga/effects';
import wheatherSagas from './wheather'
export default function* rootSaga() {
    yield all([
      wheatherSagas()
    ]);
  }