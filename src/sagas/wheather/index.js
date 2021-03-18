import {  debounce, put, all } from 'redux-saga/effects';
import { SEARCHING_REQUEST, actions as weatherActions } from '../../reducers/wheather'
export async function fetchApi(city, index) {
    var fiveDate = new Date(new Date().getTime() - ((index - 1) * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
    var todayDate = new Date(new Date().getTime() - (index * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
    const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?city=${city}&start_date=${todayDate}&end_date=${fiveDate}&key=3e9ef7ff2bb24c3ca5aaa8376e4347d2`)
    return await response.json()
}
export function* searchingWoeid({ payload: { txt } }) {
    try {
        const data = yield all([
            fetchApi(txt, 5),
            fetchApi(txt, 4),
            fetchApi(txt, 3),
            fetchApi(txt, 2),
            fetchApi(txt, 1),
        ])
        yield put(weatherActions.searchingSuccess(data));
    } catch (error) {
        yield put(weatherActions.searchingError(error));
    }
}

export default function* wheatherSaga() {
    yield debounce(300, SEARCHING_REQUEST, searchingWoeid)
    yield all([
        searchingWoeid({ payload: { txt: 'london' } })
    ])
}